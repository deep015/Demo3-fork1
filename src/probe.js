/**
 * Post-fault dispatch probe.
 *
 * Probes a Dispatcher after a crash or fault to assess its recovery status
 * and determine whether it can safely resume dispatching tasks.
 */

import { FaultState } from './dispatcher.js';

export const ProbeStatus = Object.freeze({
  PASS: 'PASS',
  DEGRADED: 'DEGRADED',
  FAIL: 'FAIL',
});

export class ProbeResult {
  constructor({ status, checks, snapshot, probedAt }) {
    this.status = status;
    this.checks = checks;
    this.snapshot = snapshot;
    this.probedAt = probedAt;
  }

  get passed() {
    return this.status === ProbeStatus.PASS;
  }

  get failed() {
    return this.status === ProbeStatus.FAIL;
  }

  get degraded() {
    return this.status === ProbeStatus.DEGRADED;
  }
}

/**
 * Run a post-fault probe against a dispatcher.
 *
 * The probe performs a sequence of checks and returns a ProbeResult.
 * Callers can supply additional named check functions for domain-specific
 * validation; each check receives the dispatcher snapshot and must return
 * { pass: boolean, detail?: string }.
 *
 * @param {import('./dispatcher.js').Dispatcher} dispatcher
 * @param {{ checks?: Record<string, (snapshot: object) => { pass: boolean, detail?: string }>, probeTask?: object }} options
 * @returns {Promise<ProbeResult>}
 */
export async function probePostFault(dispatcher, options = {}) {
  const { checks: extraChecks = {}, probeTask = null } = options;
  const snapshot = dispatcher.snapshot();
  const probedAt = new Date();
  const checkResults = {};

  // Built-in check: dispatcher must not still be FAULTED
  checkResults.notFaulted = {
    pass: snapshot.faultState !== FaultState.FAULTED,
    detail: snapshot.faultState === FaultState.FAULTED
      ? `Dispatcher is still FAULTED: ${snapshot.faultReason}`
      : `Fault state is ${snapshot.faultState}`,
  };

  // Built-in check: dispatcher should not be stuck in RECOVERING indefinitely
  checkResults.notStuckRecovering = {
    pass: snapshot.faultState !== FaultState.RECOVERING,
    detail: snapshot.faultState === FaultState.RECOVERING
      ? 'Dispatcher is still in RECOVERING state'
      : `Fault state is ${snapshot.faultState}`,
  };

  // Built-in check: at least one handler registered
  checkResults.hasHandlers = {
    pass: snapshot.registeredHandlers.length > 0,
    detail: snapshot.registeredHandlers.length > 0
      ? `${snapshot.registeredHandlers.length} handler(s) registered: ${snapshot.registeredHandlers.join(', ')}`
      : 'No handlers registered',
  };

  // Optional live dispatch probe
  if (probeTask !== null) {
    try {
      await dispatcher.dispatch(probeTask);
      checkResults.liveDispatch = { pass: true, detail: `Probe task "${probeTask.type}" dispatched successfully` };
    } catch (err) {
      checkResults.liveDispatch = { pass: false, detail: `Probe dispatch failed: ${err.message}` };
    }
  }

  // User-supplied checks
  for (const [name, fn] of Object.entries(extraChecks)) {
    try {
      const result = await fn(snapshot);
      checkResults[name] = { pass: Boolean(result.pass), detail: result.detail ?? '' };
    } catch (err) {
      checkResults[name] = { pass: false, detail: `Check threw: ${err.message}` };
    }
  }

  const failedChecks = Object.values(checkResults).filter(c => !c.pass);
  let status;
  if (failedChecks.length === 0) {
    status = ProbeStatus.PASS;
  } else if (checkResults.notFaulted?.pass === false || checkResults.liveDispatch?.pass === false) {
    status = ProbeStatus.FAIL;
  } else {
    status = ProbeStatus.DEGRADED;
  }

  return new ProbeResult({ status, checks: checkResults, snapshot, probedAt });
}
