import { AiResponseParseError } from "../errors";

/**
 * Parses a model's raw text output as JSON, tolerating the common case
 * of a response wrapped in a markdown code fence. Throws a typed
 * `AiResponseParseError` (rather than letting `JSON.parse` throw a raw
 * SyntaxError) so callers can catch one error type across every
 * capability.
 */
export function parseJsonResponse<T>(raw: string): T {
  const cleaned = stripCodeFence(raw).trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch (cause) {
    throw new AiResponseParseError(raw, cause);
  }
}

function stripCodeFence(text: string): string {
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return fenceMatch?.[1] ?? text;
}
