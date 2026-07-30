/**
 * Abstraction over "whatever LLM provider we call." Every agent service
 * method depends on this interface, not on a specific vendor SDK — so
 * connecting a real model later (Anthropic, OpenAI, or a self-hosted
 * model) means implementing this one interface and passing it into
 * `createAiAgentService`, with zero changes to prompts or services.
 */
export interface AiModelClient {
  complete(input: { system: string; prompt: string }): Promise<string>;
}

/** Placeholder client — makes the missing integration explicit and typed. */
export class UnconfiguredModelClient implements AiModelClient {
  async complete(): Promise<string> {
    throw new Error(
      "No AI model client configured. Provide a real AiModelClient implementation to createAiAgentService()."
    );
  }
}
