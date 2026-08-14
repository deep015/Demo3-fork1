#!/usr/bin/env bash
# Tests for the crash_postgres.sh script.
# Requires PostgreSQL server (postgres, initdb, pg_ctl) installed and on PATH.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CRASH_SCRIPT="${SCRIPT_DIR}/crash_postgres.sh"
TMPDIR_ROOT="${TMPDIR:-/tmp}"
TEST_PGDATA="${TMPDIR_ROOT}/pg_crash_test_$$"
PASS=0
FAIL=0

cleanup() {
    # Stop postgres if it is still running, then remove the temp data dir.
    if [[ -f "${TEST_PGDATA}/postmaster.pid" ]]; then
        local pid
        pid=$(head -1 "${TEST_PGDATA}/postmaster.pid" 2>/dev/null || true)
        [[ -n "$pid" ]] && kill -TERM "$pid" 2>/dev/null || true
    fi
    rm -rf "$TEST_PGDATA"
}
trap cleanup EXIT

pass() { echo "PASS: $1"; ((PASS++)); }
fail() { echo "FAIL: $1"; ((FAIL++)); }

require_binary() {
    if ! command -v "$1" &>/dev/null; then
        echo "SKIP: $1 not found — install postgresql-server to run these tests." >&2
        exit 0
    fi
}

require_binary initdb
require_binary pg_ctl

# ---------------------------------------------------------------------------
# Setup: initialise a temporary cluster
# ---------------------------------------------------------------------------
echo "Initialising temporary PostgreSQL cluster at $TEST_PGDATA ..."
initdb -D "$TEST_PGDATA" -A trust -U postgres --no-sync -q

PG_PORT=15432
pg_ctl -D "$TEST_PGDATA" -l "${TEST_PGDATA}/logfile" \
       -o "-p $PG_PORT -c fsync=off" start

# Give postgres a moment to write the PID file
for i in {1..10}; do
    [[ -f "${TEST_PGDATA}/postmaster.pid" ]] && break
    sleep 0.5
done

if [[ ! -f "${TEST_PGDATA}/postmaster.pid" ]]; then
    echo "ERROR: PostgreSQL did not start (no postmaster.pid after 5 s)" >&2
    exit 1
fi

ORIGINAL_PID=$(head -1 "${TEST_PGDATA}/postmaster.pid")

# ---------------------------------------------------------------------------
# Test 1: crash_postgres.sh exits 1 with a helpful message when PGDATA is wrong
# ---------------------------------------------------------------------------
output=$("${CRASH_SCRIPT}" --pgdata /nonexistent/pgdata 2>&1 || true)
if echo "$output" | grep -q "PID file not found"; then
    pass "T1: missing PGDATA produces a clear error"
else
    fail "T1: expected 'PID file not found' error, got: $output"
fi

# ---------------------------------------------------------------------------
# Test 2: crash_postgres.sh sends SIGKILL to the postmaster
# ---------------------------------------------------------------------------
"${CRASH_SCRIPT}" --pgdata "$TEST_PGDATA"

# Poll briefly to confirm the process is gone
for i in {1..20}; do
    kill -0 "$ORIGINAL_PID" 2>/dev/null || break
    sleep 0.25
done

if kill -0 "$ORIGINAL_PID" 2>/dev/null; then
    fail "T2: postmaster (PID $ORIGINAL_PID) is still alive after SIGKILL"
else
    pass "T2: postmaster (PID $ORIGINAL_PID) terminated by SIGKILL"
fi

# ---------------------------------------------------------------------------
# Test 3: cluster starts with crash recovery after a SIGKILL
# ---------------------------------------------------------------------------
echo "Restarting cluster to verify crash recovery ..."
pg_ctl -D "$TEST_PGDATA" -l "${TEST_PGDATA}/logfile2" \
       -o "-p $PG_PORT -c fsync=off" start

for i in {1..20}; do
    pg_isready -h 127.0.0.1 -p "$PG_PORT" -U postgres &>/dev/null && break
    sleep 0.5
done

if pg_isready -h 127.0.0.1 -p "$PG_PORT" -U postgres &>/dev/null; then
    pass "T3: cluster restarted successfully after SIGKILL crash"
else
    fail "T3: cluster did not come back after crash recovery"
fi

# Stop cleanly before cleanup trap runs
pg_ctl -D "$TEST_PGDATA" -m fast stop 2>/dev/null || true

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
echo ""
echo "Results: $PASS passed, $FAIL failed"
[[ $FAIL -eq 0 ]]
