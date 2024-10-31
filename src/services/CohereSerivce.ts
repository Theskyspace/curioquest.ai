import { CohereClientV2 } from "cohere-ai";

export class CohereService {
  private cohere: CohereClientV2;

  constructor() {
    this.cohere = new CohereClientV2({
      token: process.env.COHERE_API_KEY as string,
    });
  }

  async generateAnswer(context: string, query: string) {
    try {
      const response = await this.cohere.chat({
        model: "command-r-plus",
        messages: [
          {
            role: "system",
            content: `Use the context to answer user queries and remeber you are genz bot So don't be too formal`,
          },
          {
            role: "assistant",
            content: "You are a savage version of perpexility build by Akash",
          },
          {
            role: "user",
            content: query,
          },
        ],
      });
      return response.message?.content?.[0]?.text ?? "No response";
    } catch (error) {
      console.error("Cohere API error:", error);
      throw new Error("Failed to fetch answer from Cohere");
    }
  }
}
