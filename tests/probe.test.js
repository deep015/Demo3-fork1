import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { Dispatcher, FaultState } from '../src/dispatcher.js';
import { probePostFault, ProbeStatus } from '../src/probe.js';

function makeHealthyDispatcher() {
  const d = new Dispatcher();
  d.register('ping', () => 'pong');
  return d;
}

function makeRecoveredDispatcher() {
  const d = makeHealthyDispatcher();
  d.injectFault('simulated crash');
  d.beginRecovery();
  d.completeRecovery();
  return d;
}

describe('probePostFault', () => {
  describe('on a healthy dispatcher', () => {
    it('returns PASS when dispatcher is healthy', async () => {
      const result = await probePostFault(makeHealthyDispatcher());
      assert.equal(result.status, ProbeStatus.PASS);
      assert.ok(result.passed);
    });

    it('result has a probedAt timestamp', async () => {
      const result = await probePostFault(makeHealthyDispatcher());
      assert.ok(result.probedAt instanceof Date);
    });

    it('result contains a snapshot', async () => {
      const result = await probePostFault(makeHealthyDispatcher());
      assert.equal(result.snapshot.faultState, FaultState.HEALTHY);
    });
  });

  describe('on a faulted dispatcher', () => {
    it('returns FAIL when dispatcher is FAULTED', async () => {
      const d = makeHealthyDispatcher();
      d.injectFault('test crash');
      const result = await probePostFault(d);
      assert.equal(result.status, ProbeStatus.FAIL);
      assert.ok(result.failed);
    });

    it('notFaulted check fails when dispatcher is FAULTED', async () => {
      const d = makeHealthyDispatcher();
      d.injectFault('oops');
      const result = await probePostFault(d);
      assert.equal(result.checks.notFaulted.pass, false);
    });
  });

  describe('on a dispatcher stuck in RECOVERING', () => {
    it('returns DEGRADED when dispatcher is RECOVERING', async () => {
      const d = makeHealthyDispatcher();
      d.injectFault('crash');
      d.beginRecovery();
      const result = await probePostFault(d);
      assert.equal(result.status, ProbeStatus.DEGRADED);
      assert.ok(result.degraded);
    });

    it('notStuckRecovering check fails', async () => {
      const d = makeHealthyDispatcher();
      d.injectFault('crash');
      d.beginRecovery();
      const result = await probePostFault(d);
      assert.equal(result.checks.notStuckRecovering.pass, false);
    });
  });

  describe('on a fully recovered dispatcher', () => {
    it('returns PASS after fault → recovery → healthy', async () => {
      const result = await probePostFault(makeRecoveredDispatcher());
      assert.equal(result.status, ProbeStatus.PASS);
    });

    it('all built-in checks pass', async () => {
      const result = await probePostFault(makeRecoveredDispatcher());
      assert.equal(result.checks.notFaulted.pass, true);
      assert.equal(result.checks.notStuckRecovering.pass, true);
      assert.equal(result.checks.hasHandlers.pass, true);
    });
  });

  describe('live dispatch probe task', () => {
    it('passes when probe task dispatches successfully', async () => {
      const d = makeRecoveredDispatcher();
      const result = await probePostFault(d, { probeTask: { type: 'ping' } });
      assert.equal(result.checks.liveDispatch.pass, true);
      assert.equal(result.status, ProbeStatus.PASS);
    });

    it('fails when probe task dispatch fails', async () => {
      const d = makeRecoveredDispatcher();
      const result = await probePostFault(d, { probeTask: { type: 'nonexistent' } });
      assert.equal(result.checks.liveDispatch.pass, false);
      assert.equal(result.status, ProbeStatus.FAIL);
    });

    it('skips liveDispatch check when no probeTask provided', async () => {
      const result = await probePostFault(makeRecoveredDispatcher());
      assert.equal(result.checks.liveDispatch, undefined);
    });
  });

  describe('custom checks', () => {
    it('includes passing custom check in PASS result', async () => {
      const result = await probePostFault(makeRecoveredDispatcher(), {
        checks: {
          customOk: () => ({ pass: true, detail: 'all good' }),
        },
      });
      assert.equal(result.checks.customOk.pass, true);
      assert.equal(result.status, ProbeStatus.PASS);
    });

    it('downgrades to DEGRADED on failing custom check', async () => {
      const result = await probePostFault(makeRecoveredDispatcher(), {
        checks: {
          customFail: () => ({ pass: false, detail: 'something off' }),
        },
      });
      assert.equal(result.checks.customFail.pass, false);
      assert.equal(result.status, ProbeStatus.DEGRADED);
    });

    it('handles a check that throws', async () => {
      const result = await probePostFault(makeRecoveredDispatcher(), {
        checks: {
          thrower: () => { throw new Error('check explosion'); },
        },
      });
      assert.equal(result.checks.thrower.pass, false);
      assert.ok(result.checks.thrower.detail.includes('check explosion'));
    });

    it('check receives the dispatcher snapshot', async () => {
      let receivedSnapshot = null;
      const d = makeRecoveredDispatcher();
      await probePostFault(d, {
        checks: {
          capture: (snap) => { receivedSnapshot = snap; return { pass: true }; },
        },
      });
      assert.ok(receivedSnapshot !== null);
      assert.equal(receivedSnapshot.faultState, FaultState.HEALTHY);
    });
  });

  describe('hasHandlers check', () => {
    it('fails when no handlers registered', async () => {
      const d = new Dispatcher();
      const result = await probePostFault(d);
      assert.equal(result.checks.hasHandlers.pass, false);
    });
  });

  describe('ProbeResult helpers', () => {
    it('.passed is true only for PASS status', async () => {
      const pass = await probePostFault(makeRecoveredDispatcher());
      assert.ok(pass.passed);
      assert.ok(!pass.failed);
      assert.ok(!pass.degraded);
    });

    it('.failed is true only for FAIL status', async () => {
      const d = makeHealthyDispatcher();
      d.injectFault('crash');
      const result = await probePostFault(d);
      assert.ok(result.failed);
      assert.ok(!result.passed);
      assert.ok(!result.degraded);
    });

    it('.degraded is true only for DEGRADED status', async () => {
      const d = makeHealthyDispatcher();
      d.injectFault('crash');
      d.beginRecovery();
      const result = await probePostFault(d);
      assert.ok(result.degraded);
      assert.ok(!result.passed);
      assert.ok(!result.failed);
    });
  });
});
