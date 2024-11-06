import { NextResponse } from "next/server";
import { CohereService } from "../../../services/CohereSerivce";

export async function POST(request: Request) {
  const { context, query } = await request.json();

  const cohereService = new CohereService();

  const contextString = context
    .map(
      (item: { name: string; url: string; snippet: string }, index: number) =>
        `id: ${index + 1}, Name: ${item.name}, URL: ${item.url}, Snippet: ${
          item.snippet
        }`
    )
    .join("\n");
  try {
    const generatedAnswer = await cohereService.generateAnswer(
      contextString,
      query
    );
    return NextResponse.json({ answer: generatedAnswer });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Our AI Partner failed! Try again later, ${error}` },
      { status: 500 }
    );
  }
}
