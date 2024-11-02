import { NextResponse } from "next/server";
import { CohereService } from "../../../services/CohereSerivce";

export async function POST(request: Request) {
  const { context, query } = await request.json();

  const cohereService = new CohereService();

  const contextString = context
    .map(
      (item: { name: number; url: string; snippet: string }) =>
        `${item.name}\n${item.url}\n${item.snippet}`
    )
    .join("\n");
  try {
    const generatedAnswer = await cohereService.generateAnswer(
      contextString,
      query
    );
    return NextResponse.json({ answer: generatedAnswer });
  } catch (error) {
    console.error("Cohere API Error:", error);
    return NextResponse.json(
      { error: "Our AI Partner failed! Try again later" },
      { status: 500 }
    );
  }
}
