
"use client"

import ImageGrid from '@/components/imageGrid';
import HorizontalGrid from '@/components/sources';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';


export default function ChatPage() {
  const [query, setQuery] = useState<string | null>(null);
  const [followup, setFollowup] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [searchContext, setSearchContext] = useState<any>({});
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isContextLoading, setIsContextLoading] = useState<boolean>(false);
  const [isAIwaiting, setIsAIwaiting] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [AIresponse, setAIresponse] = useState<any>({});

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [followup]);

  // Stream Response
  // useEffect(() => {
  //   const fetchInitialResponse = async () => {
  //     const storedQuery = sessionStorage.getItem('searchQuery');
  //     if (storedQuery) {
  //       setQuery(storedQuery);
  //       setIsLoading(true);

  //       try {
  //         const res = await fetch('/api/query', {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({ query: storedQuery }),
  //         });

  //         const reader = res.body?.getReader();
  //         const decoder = new TextDecoder();


  //         if (reader) {
  //           while (true) {
  //             const { done, value } = await reader.read();
  //             if (done) {
  //               console.log('Stream complete', response);
  //               break
  //             };

  //             const chunk = decoder.decode(value, { stream: true });
  //             console.log('Chunk:', chunk);
  //             const lines = chunk.split("\n").filter(Boolean);

  //             lines.forEach((line) => {
  //               try {
  //                 const parsedLine = JSON.parse(line.replace(/^data:\s*/, ''));
  //                 const newText = parsedLine.content?.text;
  //                 if (newText) {
  //                   setResponse((prev) => prev + newText);
  //                   setIsLoading(false);
  //                 }
  //               } catch (error) {
  //                 console.error("Error parsing chunk:", error);
  //               }
  //             });
  //           }
  //         }
  //       } catch (error) {
  //         console.error('Error fetching response:', error);
  //         setResponse('An error occurred while fetching the response.');
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   };


  //   fetchInitialResponse();

  // }, []);

  useEffect(() => {
    const fetchInitialResponse = async () => {
      const storedQuery = sessionStorage.getItem('searchQuery');
      if (storedQuery) {
        setQuery(storedQuery);
        try {
          const res = await axios.post('/api/get_context', { query: storedQuery });
          setSearchContext(res.data);
          setIsContextLoading(false);
          console.log("Response:", res.data);
        } catch (error) {
          console.log(error);
          setSearchContext('An error occurred while fetching the response.');
          setIsContextLoading(false);
        }
      }
    };
    setIsContextLoading(true);
    fetchInitialResponse();
  }, []); // Empty array ensures this only runs once on mount

  useEffect(() => {
    const fetchInitialResponse = async () => {
      const storedQuery = sessionStorage.getItem('searchQuery');
      if (storedQuery) {
        setQuery(storedQuery);
        try {
          const res = await axios.post('/api/get_answer', { query: storedQuery, context: searchContext.context });
          setAIresponse(res.data);
          setIsAIwaiting(false);
          console.log("Response:", res.data);
        } catch (error) {
          console.log(error);
          setAIresponse('An error occurred while fetching the response.');
          setIsAIwaiting(false);
        }
      }
    };
    fetchInitialResponse();
  }, [searchContext]); // Empty array ensures this only runs once on mount



  return (
    console.log("Is AI waiting : ", isAIwaiting),
    <div className='md:px-12 pt-12 lg:px-44 pb-24' >
      <div className="md:grid grid-cols-12 text-text gap-xl min-h-screen  animate-fadeIn">
        <div className="col-span-8">
          {/* Heading */}
          <h1 className="text-3xl">{query}</h1>
          {isContextLoading}

          {/* Sources */}
          <div className="p-4 rounded-lg">
            <h2 className="text-xl mb-2">Sources</h2>
            <HorizontalGrid loading={isContextLoading} source_items={searchContext?.searchEngine?.webPages ? searchContext.searchEngine.webPages : []} />
          </div>

          {/* Answer */}
          <div className="p-4  rounded-lg  ">
            <h2 className="text-xl mb-2">Answer</h2>
            <div className="text-text ">
              {isAIwaiting ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="h-4 bg-darkGray rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="prose pb-2"
                >
                  {AIresponse.answer}
                </ReactMarkdown>
              )}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="col-span-4 mx-8">
          <div className='sticky top-headerHeight z-10 mt-md flex max-h-[calc(100vh_-var(--header-height))] flex-col pt-md' >
            <ImageGrid loading={isContextLoading} images={searchContext?.searchEngine?.images ? searchContext.searchEngine.images : []} />
          </div>
        </div>

      </div >
      <div className="sticky bottom-10 z-20  w-full p-2  text-center md:grid grid-cols-12 text-text gap-xl animate-fadeInfromBottom">
        <div className="col-span-8 relative w-full p-4 border bg-primary border-border rounded-xl shadow-md flex flex-row min-h-[30px]">
          <textarea
            ref={textAreaRef}
            className="w-full bg-transparent text-text rounded-lg resize-none focus:outline-none mb-4"
            value={followup || ''}
            onChange={(e) => setFollowup(e.target.value)}
            placeholder="Ask a follow up question..."
            rows={1}
          />
          <div className="flex justify-center items-end">
            <button
              className={`p-2 text-text rounded-full shadow focus:outline-none bg-cyan-600 hover:bg-cyan-700 w-10 h-10 flex items-center justify-center`}
              onClick={() => { }}
            >
              <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <span></span>
      </div>
    </div >
  );
}
