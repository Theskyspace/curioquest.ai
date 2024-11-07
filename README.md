<p align="center">
  <img src="https://github.com/user-attachments/assets/1a3d18dc-01f7-4acd-ae71-78fa082969f2" alt="logo" style="height:200px" />
</p>


<h1 align="center">CurioQuest</h1>
<p align="center">
  <a href="https://curioquest.vercel.app/" target="_blank" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/Visit%20CurioQuest-0078D4?style=for-the-badge&logo=curiosity&logoColor=white" alt="Visit Site"/>
  </a>
</p>

<p align="center">CurioQuest is an AI-powered question-answering application that leverages Bing Search for context and Cohere AI for generating detailed, citation-based responses. Designed for knowledge seekers, CurioQuest provides accurate, source-cited answers to complex questions in real-time.
</p>

## Table of Contents
- [Overview](#overview)
- [Objectives](#objectives)
- [Setup and Installation](#setup-and-installation)
- [Deployment](#deployment)
- [Usage](#usage)
- [Design Decisions](#design-decisions)
- [Architecture](#Architecture)

---

### Overview
<p align="center">
  <img width="900" alt="Home Screen of CurioQuest" src="https://github.com/user-attachments/assets/45dfb1a7-a0f2-455b-b74b-442d5ecd763b"/>
</p>

CurioQuest combines real-time Bing Search with Cohere AI to deliver reliable, source-cited answers, reducing misinformation and enhancing the accuracy of every response. It’s designed not just for curiosity-driven exploration, but also as a showcase of cutting-edge tech, all while aiming to build something cool enough to get noticed—and maybe even **hired!**

---

### Objectives
1. **Provide source-cited answers**: Offer verifiable answers to user queries with citations to relevant sources.
2. **Real-time information retrieval**: Use Bing Search API for up-to-date data on the topic.
3. **Engaging and dynamic interactions**: Incorporate AI-driven responses for a more interactive and informative experience.
4. **Intuitive UI/UX:** Designed with a clean, minimalistic interface that keeps the focus on content, enabling users to easily ask questions, view responses, and explore citations without distraction.

---

### Setup and Installation

#### Prerequisites
- **Node.js** (v14+)
- **npm** or **yarn** package manager
- **Bing API Key** and **Cohere API Key**

#### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/theskyspace/curioquest.git
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

### Architecture

<p align="center">
<img width="622" alt="Screenshot 2024-11-05 at 1 09 14 PM" src="https://github.com/user-attachments/assets/be28e7ff-54b9-422c-b1c2-27fe1cdc0fd8">
</p>

### Design Decisions


#### 1. Why Bing?
When selecting a search API, we evaluated major options like Google, X, and Bing. After weighing our choices, Bing emerged as the clear winner. Here’s why:

- **Trustworthy Source**: Platforms like Perplexity also rely on Bing, indicating it’s a trusted source for accurate, structured, and real-time data.
- **Seamless Integration**: Bing’s API integrates smoothly, enabling us to deliver fast, reliable answers without technical bottlenecks.
- **Reliable and Up-to-Date**: Bing excels at providing the latest information, aligning perfectly with our goal of offering timely, verifiable responses.

For those interested in our research:
- [Fireside Chat with Aravind Srinivas, CEO of Perplexity AI, & Matt Turck, Partner at FirstMark](https://www.youtube.com/watch?v=RTCVzZb3RTE&t=1995s)
- [Reddit on Perplexity’s Backend](https://www.reddit.com/r/MachineLearning/comments/1bcq8zy/d_can_someone_please_clarify_if_web_search_llms/)
<br>

#### 2. Cohere AI for Answer Generation
The decision to use Cohere AI for generating responses was driven by both practicality and budget optimization. While premium models like GPT were appealing, Cohere offered a cost-effective solution that still delivers high-quality, contextually accurate answers.  
*Maybe someday, if I land a role with a bigger budget, we can go “broke-free” and integrate the premium models—but until then, Cohere is a solid choice!* 😅
<br>

#### 3. Streamlined UI
The UI is designed with a minimalist layout to enhance content focus, and citation bubbles offer quick access to sources for easy reference.
<br>

#### 4. Why I Chose Next.js
- **Time Crunch and UI Focus**: With limited time, Next.js was ideal for building a sleek, responsive UI that offers seamless functionality. Its SSR and file-based routing simplified a lot of front-end work.
- **Perfect Fit for MVP**: As an MVP with minimal backend requirements, Next.js made sense as a front-end-first framework that’s easy to scale if needed.
- **New Territory**: Initially, I was a bit skeptical since I hadn’t worked with Next.js extensively. However, its developer-friendly setup and extensive ecosystem made it manageable and a solid choice for tight deadlines and feature-rich UIs.
<br>

#### 5. Separation of Context and AI Generation APIs
- Due to Next.js function call limitations on the free tier, we opted to separate the context-gathering and AI generation functionalities into distinct APIs. This approach allowed us to manage call frequency more efficiently while staying within free-tier constraints. By isolating these services, we could ensure smoother performance and flexibility, especially as demands for either context or AI-driven responses evolve with project scaling.
---
For more Info feel free
<a href="https://your-notion-link.com" target="_blank" style="text-decoration: none;">
  <button style="background-color: #000; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">
    📘 Visit Notion Doc
  </button>
</a>


