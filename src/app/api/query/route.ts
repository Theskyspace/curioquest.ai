import { NextRequest, NextResponse } from "next/server";
import { CohereClientV2 } from "cohere-ai";
import * as dotenv from "dotenv";

dotenv.config();

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY as string,
});

export async function POST(request: NextRequest) {
  const { query } = await request.json();
  console.log("Query:", query);

  try {
    const response = await cohere.chat({
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
    console.log("Response:", response);
    console.log("Answer:", response.message?.content?.[0]?.text);
    return NextResponse.json({
      answer: response.message?.content?.[0]?.text ?? "No response",
    });
  } catch (error) {
    console.error("Error with Cohere API:", error);
    return NextResponse.error();
  }
}

// import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";
// import { CohereClientV2 } from "cohere-ai";
// import * as dotenv from "dotenv";

// dotenv.config();

// const cohere = new CohereClientV2({
//   token: process.env.COHERE_API_KEY as string,
// });

// export async function POST(request: NextRequest) {
//   const { query } = await request.json();

//   try {
//     // Step 1: Fetch information from Bing
//     const bingResponse = await axios.get(
//       "https://api.bing.microsoft.com/v7.0/search",
//       {
//         params: { q: query },
//         headers: { "Ocp-Apim-Subscription-Key": process.env.BING_API_KEY },
//       }
//     );

//     // Step 2: Compile the Bing results
//     const searchResults = bingResponse.data.webPages.value;
//     const context = searchResults
//       .map(
//         (result: any, index: number) =>
//           `${index + 1}. ${result.name} - ${result.url}`
//       )
//       .join("\n");

//     // Step 3: Generate an answer using Cohere with citations
//     const cohereResponse = await cohere.generate({
//       model: "command-xlarge-20210924",
//       prompt: `Using the context below, answer the following query with citations from the sources provided:\n\nContext:\n${context}\n\nQuery: ${query}\n\nAnswer with citations:`,
//       max_tokens: 300,
//       temperature: 0.7,
//       k: 0,
//       stop_sequences: ["\n"],
//     });

//     const answer = cohereResponse.data.generations[0].text.trim();

//     return NextResponse.json({ answer });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { error: "Failed to retrieve data or generate response" },
//       { status: 500 }
//     );
//   }
// }
