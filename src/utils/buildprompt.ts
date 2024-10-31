export function buildPrompt(
  searchResults: Array<{ name: string; url: string; snippet: string }>,
  query: string
): string {
  const formattedResults = searchResults
    .map(
      (result, index) =>
        `${index + 1}. ${result.name} - ${result.snippet} (${result.url})`
    )
    .join("\n");

  return `Here is some context:\n${formattedResults}\n\nUser: ${query}\nAI:`;
}
