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
            content: `You can use the text provided below to help you answer. If you are not confident with your answer, say 'I don't know' then stop.

    You are not allowed to add links from sites that are not mentioned in the Sources.

    Citations must replace the keyword in the source text. Do not cite like "(Source: )".`,
          },
          {
            role: "assistant",
            content: `Use Markdown format and format for inline citations. 
              Each citation number should appear directly after the referenced point.
              Aim for a response that is both clear and well-cited. Ensure every statement is cited.`,
          },
          {
            role: "user",
            content: `Answer the question '${query}?'.
              SOURCE ${context}`,
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
