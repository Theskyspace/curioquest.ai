import axios from "axios";

export class BingSearchService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async search(query: string) {
    try {
      const response = await axios.get(
        "https://api.bing.microsoft.com/v7.0/search",
        {
          params: { q: query },
          headers: { "Ocp-Apim-Subscription-Key": this.apiKey },
        }
      );
      return response.data.webPages.value.map(
        (item: { name: string; url: string; snippet: string }) => ({
          name: item.name,
          url: item.url,
          snippet: item.snippet,
        })
      );
    } catch (error) {
      console.error("Bing Search API error:", error);
      throw new Error("Failed to fetch search results");
    }
  }
}
