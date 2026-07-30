/**
 * Shared error types for the Arc service layer. Using typed errors
 * (instead of throwing strings or generic Errors) lets callers — API
 * routes, server actions, UI — branch on `instanceof` and respond
 * appropriately instead of parsing message strings.
 */

export class ArcServiceError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "ArcServiceError";
  }
}

/**
 * Thrown by every stubbed service method in this layer. Every module
 * here defines its real interface today; the SDK-backed implementation
 * is a drop-in replacement behind the same interface later.
 */
export class NotImplementedError extends ArcServiceError {
  constructor(serviceMethod: string) {
    super(`${serviceMethod} is not implemented yet — Arc SDK integration is pending.`);
    this.name = "NotImplementedError";
  }
}
