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
        temperature: 0.5,
        p: 0.85,
        messages: [
          {
            role: "system",
            content: `You are a highly informative assistant. Respond to questions in a well-organized Markdown format. Here’s how to structure your answer:

        - **Sectioned Format**: Divide the answer into relevant sections with headings (e.g., "Background," "Steps," "Benefits," etc.), depending on the question type.
        - **Bullets and Numbered Lists**: Use bullet points and numbered lists for clarity in explanations, instructions, or multiple points.
        - **Inline Citations**: Add inline citations for any facts or claims, using footnote syntax ({1}, {2}, etc.), with at most two citations per relevant point if possible.
       `,
          },
          {
            role: "user",
            content: `Here is the question: ${query}
      Use the following context for your answer:
      ${context}`,
          },
        ],
      });

      return response.message?.content?.[0]?.text ?? "No response";
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (error) {
        throw new Error(
          "Since we are on Free tier, It has exceeded the limit of requests. Please contact dev."
        );
      }
      console.error("Cohere API error:", error);
      throw new Error("Failed to fetch answer from Cohere");
    }
  }
}
