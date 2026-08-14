#!/usr/bin/env bash
# Crash PostgreSQL by sending SIGKILL to the postmaster process.
# Use only in test environments to simulate an unclean shutdown.

set -euo pipefail

usage() {
    echo "Usage: $0 [--pgdata <data-dir>]"
    echo ""
    echo "  Locate the PostgreSQL postmaster PID and kill it with SIGKILL."
    echo "  PGDATA defaults to the PGDATA environment variable, or /var/lib/postgresql/data."
    exit 1
}

PGDATA="${PGDATA:-/var/lib/postgresql/data}"

while [[ $# -gt 0 ]]; do
    case "$1" in
        --pgdata) PGDATA="$2"; shift 2 ;;
        -h|--help) usage ;;
        *) echo "Unknown argument: $1" >&2; usage ;;
    esac
done

PID_FILE="${PGDATA}/postmaster.pid"

if [[ ! -f "$PID_FILE" ]]; then
    echo "ERROR: PID file not found: $PID_FILE" >&2
    echo "Is PostgreSQL running with PGDATA=$PGDATA?" >&2
    exit 1
fi

POSTMASTER_PID=$(head -1 "$PID_FILE")

if [[ -z "$POSTMASTER_PID" ]]; then
    echo "ERROR: Could not read PID from $PID_FILE" >&2
    exit 1
fi

if ! [[ "$POSTMASTER_PID" =~ ^[0-9]+$ ]]; then
    echo "ERROR: Invalid PID '$POSTMASTER_PID' in $PID_FILE" >&2
    exit 1
fi

echo "Sending SIGKILL to PostgreSQL postmaster (PID $POSTMASTER_PID)..."
kill -KILL "$POSTMASTER_PID" 2>/dev/null || {
    echo "ERROR: Failed to send SIGKILL to PID $POSTMASTER_PID" >&2
    exit 1
}

echo "PostgreSQL postmaster (PID $POSTMASTER_PID) killed with SIGKILL."
echo "The cluster is now in an unclean-shutdown state and will run crash recovery on next start."
