import { CohereClientV2 } from "cohere-ai";

export class CohereService {
  private cohere: CohereClientV2;

  constructor() {
    this.cohere = new CohereClientV2({
      token: process.env.COHERE_API_KEY as string,
    });
  }

  async generateAnswer(context: string, query: string) {
    console.log("********* CohereService.generateAnswer:", context, query);
    try {
      const response = await this.cohere.chat({
        model: "command-r-plus",
        temperature: 0.5,
        p: 0.85,
        messages: [
          {
            role: "system",
            content: `You are an informative assistant. Provide answers with inline citations as footnotes, using Markdown's footnote syntax ({1}, {2}, etc.). For each paragraph, include at least two citations wherever applicable, and place footnotes directly after the relevant sentences or statements. Summarize the content without deviating from the provided context.`,
          },
          {
            role: "user",
            content: `Here is the question: ${query}
        Use the following context for your answer:
        ${context}`,
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
