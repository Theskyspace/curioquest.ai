import { CohereClientV2 } from "cohere-ai";

export class CohereService {
  private cohere: CohereClientV2;

  constructor() {
    this.cohere = new CohereClientV2({
      token: process.env.COHERE_API_KEY as string,
    });
  }

  async generateAnswer(context: string, query: string) {
    console.log("CohereService.generateAnswer:", context, query);
    try {
      const response = await this.cohere.chat({
        model: "command-r-plus",
        temperature: 0.5, // Lower temperature for more focused responses
        p: 0.85, // Slightly adjust for controlled diversity
        messages: [
          {
            role: "system",
            content:
              "You are an informative assistant tasked with providing answers based on factual information. Always cite your sources using inline references, and be clear, concise, and professional in your response If possible make ansers atlaest 500 words.",
          },
          {
            role: "assistant",
            content:
              "Use only the provided context or well-established information to answer. Ensure citations are clearly indicated for any data or claims drawn from sources.",
          },
          {
            role: "user",
            content: `Here is the question: ${query}\n\nPlease use the following context for your answer:\n\n${context}`,
          },
        ],
      });
      console.log("Cohere response:", response.message?.content?.[0]?.text);
      return response.message?.content?.[0]?.text ?? "No response";
    } catch (error) {
      console.error("Cohere API error:", error);
      throw new Error("Failed to fetch answer from Cohere");
    }
  }
}
