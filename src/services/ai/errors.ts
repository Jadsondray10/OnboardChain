export class AiServiceError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "AiServiceError";
  }
}

/** Thrown by agent methods until a model client is wired in. */
export class AiNotConfiguredError extends AiServiceError {
  constructor(method: string) {
    super(`${method} has no AI model connected yet — see services/ai/model-client.ts.`);
    this.name = "AiNotConfiguredError";
  }
}

/** Thrown when a model response can't be parsed into the expected shape. */
export class AiResponseParseError extends AiServiceError {
  constructor(raw: string, cause?: unknown) {
    super(`Failed to parse AI response as JSON: ${raw.slice(0, 200)}`, cause);
    this.name = "AiResponseParseError";
  }
}
