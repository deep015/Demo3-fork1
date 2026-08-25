import { describe, it, before, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { Dispatcher, DispatchError, FaultState } from '../src/dispatcher.js';

describe('Dispatcher', () => {
  let dispatcher;

  beforeEach(() => {
    dispatcher = new Dispatcher();
  });

  describe('initial state', () => {
    it('starts in HEALTHY state', () => {
      assert.equal(dispatcher.faultState, FaultState.HEALTHY);
    });

    it('starts with zero dispatch count', () => {
      assert.equal(dispatcher.dispatchCount, 0);
    });

    it('starts with zero fault count', () => {
      assert.equal(dispatcher.faultCount, 0);
    });
  });

  describe('handler registration', () => {
    it('registers a handler and returns the dispatcher for chaining', () => {
      const result = dispatcher.register('ping', () => 'pong');
      assert.equal(result, dispatcher);
    });

    it('throws TypeError if handler is not a function', () => {
      assert.throws(
        () => dispatcher.register('bad', 'not-a-function'),
        TypeError
      );
    });
  });

  describe('dispatch', () => {
    it('calls the registered handler and returns its result', async () => {
      dispatcher.register('echo', (task) => task.payload);
      const result = await dispatcher.dispatch({ type: 'echo', payload: 'hello' });
      assert.equal(result, 'hello');
      assert.equal(dispatcher.dispatchCount, 1);
    });

    it('throws DispatchError for unregistered task types', async () => {
      await assert.rejects(
        () => dispatcher.dispatch({ type: 'unknown' }),
        DispatchError
      );
    });

    it('throws DispatchError and enters FAULTED state when handler throws', async () => {
      dispatcher.register('bomb', () => { throw new Error('kaboom'); });
      await assert.rejects(
        () => dispatcher.dispatch({ type: 'bomb' }),
        DispatchError
      );
      assert.equal(dispatcher.faultState, FaultState.FAULTED);
      assert.equal(dispatcher.faultCount, 1);
    });

    it('increments dispatchCount before fault', async () => {
      dispatcher.register('bomb', () => { throw new Error('boom'); });
      await assert.rejects(() => dispatcher.dispatch({ type: 'bomb' }));
      assert.equal(dispatcher.dispatchCount, 1);
    });

    it('rejects dispatch while in FAULTED state', async () => {
      dispatcher.injectFault('test fault');
      dispatcher.register('ok', () => 'ok');
      await assert.rejects(
        () => dispatcher.dispatch({ type: 'ok' }),
        DispatchError
      );
    });
  });

  describe('fault injection', () => {
    it('transitions to FAULTED state', () => {
      dispatcher.injectFault('synthetic crash');
      assert.equal(dispatcher.faultState, FaultState.FAULTED);
      assert.equal(dispatcher.faultReason, 'synthetic crash');
      assert.ok(dispatcher.crashedAt instanceof Date);
    });

    it('uses default reason when none provided', () => {
      dispatcher.injectFault();
      assert.ok(dispatcher.faultReason.length > 0);
    });
  });

  describe('recovery lifecycle', () => {
    it('transitions FAULTED -> RECOVERING -> HEALTHY', () => {
      dispatcher.injectFault('test');
      assert.equal(dispatcher.faultState, FaultState.FAULTED);

      dispatcher.beginRecovery();
      assert.equal(dispatcher.faultState, FaultState.RECOVERING);

      dispatcher.completeRecovery();
      assert.equal(dispatcher.faultState, FaultState.HEALTHY);
      assert.equal(dispatcher.faultReason, null);
      assert.equal(dispatcher.crashedAt, null);
    });

    it('throws when beginRecovery called from HEALTHY', () => {
      assert.throws(() => dispatcher.beginRecovery(), Error);
    });

    it('throws when completeRecovery called from FAULTED', () => {
      dispatcher.injectFault('test');
      assert.throws(() => dispatcher.completeRecovery(), Error);
    });

    it('allows dispatch after full recovery', async () => {
      dispatcher.register('ping', () => 'pong');
      dispatcher.injectFault('test');
      dispatcher.beginRecovery();
      dispatcher.completeRecovery();

      const result = await dispatcher.dispatch({ type: 'ping' });
      assert.equal(result, 'pong');
    });
  });

  describe('snapshot', () => {
    it('returns current dispatcher state', () => {
      dispatcher.register('a', () => {});
      dispatcher.register('b', () => {});
      const snap = dispatcher.snapshot();
      assert.equal(snap.faultState, FaultState.HEALTHY);
      assert.deepEqual(snap.registeredHandlers.sort(), ['a', 'b']);
      assert.equal(snap.dispatchCount, 0);
      assert.equal(snap.faultCount, 0);
    });
  });
});
