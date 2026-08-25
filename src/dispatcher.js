/**
 * Task dispatcher with fault injection and crash simulation support.
 *
 * FaultState transitions:
 *   HEALTHY -> FAULTED (via injectFault / crash)
 *   FAULTED -> RECOVERING (via beginRecovery)
 *   RECOVERING -> HEALTHY (via completeRecovery)
 */

export const FaultState = Object.freeze({
  HEALTHY: 'HEALTHY',
  FAULTED: 'FAULTED',
  RECOVERING: 'RECOVERING',
});

export class DispatchError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'DispatchError';
    this.cause = cause;
  }
}

export class Dispatcher {
  #handlers = new Map();
  #faultState = FaultState.HEALTHY;
  #faultReason = null;
  #crashedAt = null;
  #dispatchCount = 0;
  #faultCount = 0;

  get faultState() {
    return this.#faultState;
  }

  get faultReason() {
    return this.#faultReason;
  }

  get crashedAt() {
    return this.#crashedAt;
  }

  get dispatchCount() {
    return this.#dispatchCount;
  }

  get faultCount() {
    return this.#faultCount;
  }

  register(taskType, handler) {
    if (typeof handler !== 'function') {
      throw new TypeError(`Handler for "${taskType}" must be a function`);
    }
    this.#handlers.set(taskType, handler);
    return this;
  }

  async dispatch(task) {
    if (this.#faultState === FaultState.FAULTED) {
      throw new DispatchError(
        `Dispatcher is in FAULTED state: ${this.#faultReason}`,
        { faultReason: this.#faultReason, crashedAt: this.#crashedAt }
      );
    }

    const handler = this.#handlers.get(task.type);
    if (!handler) {
      throw new DispatchError(`No handler registered for task type "${task.type}"`);
    }

    this.#dispatchCount++;
    try {
      return await handler(task);
    } catch (err) {
      this.#faultCount++;
      this.injectFault(`Handler threw: ${err.message}`);
      throw new DispatchError(`Dispatch failed for task type "${task.type}"`, err);
    }
  }

  injectFault(reason = 'manual fault injection') {
    this.#faultState = FaultState.FAULTED;
    this.#faultReason = reason;
    this.#crashedAt = new Date();
  }

  beginRecovery() {
    if (this.#faultState !== FaultState.FAULTED) {
      throw new Error(`Cannot begin recovery from state "${this.#faultState}"`);
    }
    this.#faultState = FaultState.RECOVERING;
  }

  completeRecovery() {
    if (this.#faultState !== FaultState.RECOVERING) {
      throw new Error(`Cannot complete recovery from state "${this.#faultState}"`);
    }
    this.#faultState = FaultState.HEALTHY;
    this.#faultReason = null;
    this.#crashedAt = null;
  }

  snapshot() {
    return {
      faultState: this.#faultState,
      faultReason: this.#faultReason,
      crashedAt: this.#crashedAt,
      dispatchCount: this.#dispatchCount,
      faultCount: this.#faultCount,
      registeredHandlers: [...this.#handlers.keys()],
    };
  }
}
