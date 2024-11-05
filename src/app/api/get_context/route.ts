import { NextRequest, NextResponse } from "next/server";
import { BingSearchService } from "@/services/BingSearchService";

const bingService = new BingSearchService(process.env.BING_API_KEY || "");

export async function POST(request: NextRequest) {
  const { query } = await request.json();
  console.log("Query:", query);

  interface FinalResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchEngine?: any;
    context?: string[];
  }

  const finalResponse: FinalResponse = {};

  try {
    const bingResponse = await bingService.search(query);
    finalResponse.searchEngine = bingResponse;
  } catch (error) {
    console.error("Bing API Error:", error);
    return NextResponse.json(
      { error: "Our Web Searching Partner failed! Try again later" },
      { status: 500 }
    );
  }

  finalResponse.context = finalResponse.searchEngine?.webPages?.slice(0, 5);
  return NextResponse.json(finalResponse);

  // try {
  //   const response = await cohere.chat({
  //     model: "command-r-plus",
  //     messages: [
  //       // {
  //       //   role: "system",
  //       //   content: `Use the context to answer user queries and remeber you are genz bot So don't be too formal`,
  //       // },
  //       // {
  //       //   role: "assistant",
  //       //   content: "You are a savage version of perpexility build by Akash",
  //       // },
  //       {
  //         role: "user",
  //         content: query,
  //       },
  //     ],
  //   });
  //   console.log("Response:", response);
  //   console.log("Answer:", response.message?.content?.[0]?.text);
  //   return NextResponse.json({
  //     answer: response.message?.content?.[0]?.text ?? "No response",
  //   });
  // } catch (error) {
  //   console.error("Error with Cohere API:", error);
  //   return NextResponse.error();
}

// Stream Response
// import { NextRequest } from "next/server";
// import { CohereClientV2 } from "cohere-ai";

// const cohere = new CohereClientV2({
//   token: process.env.COHERE_API_KEY || "",
// });

// export async function POST(request: NextRequest) {
//   const { query } = await request.json();

//   const stream = await cohere.chatStream({
//     model: "command-r-plus",
//     temperature: 0.7,
//     p: 0.9,
//     messages: [
//       // {
//       //   role: "system",
//       //   content: `Use the context to answer user queries as a Gen Z bot and keep it informal.`,
//       // },
//       {
//         role: "assistant",
//         content: "Whenever possible, provide a citation for your answer.",
//       },
//       {
//         role: "user",
//         content: query,
//       },
//     ],
//   });
//   return new Response(
//     new ReadableStream({
//       async start(controller) {
//         for await (const chatEvent of stream) {
//           if (chatEvent.type === "content-delta" && chatEvent.delta?.message) {
//             controller.enqueue(
//               `data: ${JSON.stringify(chatEvent.delta?.message)}\n\n`
//             );
//           }
//         }
//         controller.close();
//       },
//     }),
//     {
//       headers: {
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache",
//         Connection: "keep-alive",
//       },
//     }
//   );
// }

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
