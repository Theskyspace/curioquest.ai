<p align="center">
  <img src="https://github.com/user-attachments/assets/1a3d18dc-01f7-4acd-ae71-78fa082969f2" alt="logo" style="height:200px" />
</p>


<h1 align="center">CurioQuest</h1>

<p align="center">CurioQuest is an AI-powered question-answering application that leverages Bing Search for context and Cohere AI for generating detailed, citation-based responses. Designed for knowledge seekers, CurioQuest provides accurate, source-cited answers to complex questions in real-time.
</p>

## Table of Contents
- [Overview](#overview)
- [Objectives](#objectives)
- [Setup and Installation](#setup-and-installation)
- [Deployment](#deployment)
- [Usage](#usage)
- [Design Decisions](#design-decisions)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Improvements](#future-improvements)

---

### Overview
CurioQuest enables users to ask questions and receive detailed, citation-based answers by integrating information from Bing Search and generating structured answers using Cohere AI. Its goal is to enhance the quality and reliability of information retrieval by ensuring every answer is substantiated with sources.

---

### Objectives
1. **Provide source-cited answers**: Offer verifiable answers to user queries with citations to relevant sources.
2. **Real-time information retrieval**: Use Bing Search API for up-to-date data on the topic.
3. **Engaging and dynamic interactions**: Incorporate AI-driven responses for a more interactive and informative experience.

---

### Setup and Installation

#### Prerequisites
- **Node.js** (v14+)
- **npm** or **yarn** package manager
- **Bing API Key** and **Cohere API Key**

#### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/username/curioquest.git
    cd curioquest
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure environment variables:
    - Create a `.env` file in the root directory:
        ```plaintext
        BING_API_KEY=your_bing_api_key
        COHERE_API_KEY=your_cohere_api_key
        NEXT_PUBLIC_BASE_URL=http://localhost:3000
        ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Visit `http://localhost:3000` in your browser to use the application.

---

### Deployment

#### Vercel Deployment
1. Set up a Vercel account and link the project repository.
2. Configure the environment variables in Vercel:
    - `BING_API_KEY`
    - `COHERE_API_KEY`
    - `NEXT_PUBLIC_BASE_URL`
3. Deploy the application by following the Vercel dashboard prompts.
4. Access the deployed application via the generated Vercel URL.

---

### Usage

#### Main Features
1. **Query Input**: Users can type in any question to initiate a search.
2. **Follow-Up Questions**: After receiving an initial response, users can ask follow-up questions to refine the context or request additional information.
3. **Source-Cited Answers**: Every response includes references to sources, which can be viewed by hovering over the citations.

#### Example Interactions
1. **Ask a Question**:
    - User: "Who is Elon Musk?"
    - CurioQuest: Returns a detailed answer with citations from Bing Search.
2. **Follow-Up Questions**:
    - User: "What are his companies?"
    - CurioQuest: Uses the previous context to provide an updated answer with sources.

---

### Design Decisions

1. **Bing API for Contextual Data**: Chose Bing for real-time search results to provide the latest, reliable data on complex topics.
2. **Cohere AI for Answer Generation**: Selected Cohere for its robust language model, allowing for structured responses with a natural tone and readability.
3. **Streamlined UI**: Designed with a minimalist layout to enhance focus on the content, with citation bubbles for easy reference.

---

### Challenges and Solutions

1. **Handling API Rate Limits**:
   - **Challenge**: Encountered rate limits with both Bing and Cohere APIs during high-volume testing.
   - **Solution**: Implemented caching and limited the frequency of calls with an optimized request strategy.
   
2. **Citation Formatting**:
   - **Challenge**: Ensuring citations are clear and directly linked to specific parts of the answer.
   - **Solution**: Developed a custom tooltip for hover-based citation display, with clickable links to sources.

3. **Data Parsing and Context Building**:
   - **Challenge**: Merging information from multiple Bing sources for concise responses.
   - **Solution**: Built a middleware function that aggregates and condenses the data before passing it to Cohere.

---

### Future Improvements

1. **Support for Multiple Languages**: Expand to include multi-language support with additional language models.
2. **Improved Error Handling**: Enhance user feedback with descriptive error messages and retry options in case of API failures.
3. **Enhanced Caching Mechanism**: Implement more robust caching to reduce latency and dependency on external APIs.

---

This README provides a comprehensive overview of CurioQuest, from setup to potential future improvements, ensuring that contributors and users can navigate, deploy, and interact with the application efficiently.
