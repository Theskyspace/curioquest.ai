
"use client"
import HorizontalGrid from '@/components/sources';
import { useEffect, useRef, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';

export default function ChatPage() {
  const [query, setQuery] = useState<string | null>(null);
  const [followup, setFollowup] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [followup]);

  useEffect(() => {
    const fetchInitialResponse = async () => {
      const storedQuery = sessionStorage.getItem('searchQuery');
      if (storedQuery) {
        setQuery(storedQuery);
        try {
          const res = await axios.post('/api/query', { query: storedQuery });
          setResponse(res.data.answer);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching response:', error);
          setResponse('An error occurred while fetching the response.');
          setIsLoading(false);
        }
      }
    };
    setIsLoading(true);
    fetchInitialResponse();
  }, []); // Empty array ensures this only runs once on mount

  return (
    <div className='md:px-12 pt-12 lg:px-44'>
      <div className="md:grid grid-cols-12 text-text gap-xl min-h-screen  animate-fadeIn">
        <div className="col-span-8">
          {/* Heading */}
          <h1 className="text-3xl">{query}</h1>
          {isLoading}

          {/* Sources */}
          <div className="p-4 rounded-lg">
            <h2 className="text-xl mb-2">Sources</h2>
            <HorizontalGrid loading={isLoading} />
          </div>

          {/* Answer */}
          <div className="p-4  rounded-lg  ">
            <h2 className="text-xl mb-2">Answer</h2>
            <div className="text-text pb-10">
              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="h-4 bg-darkGray rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="prose"
                >
                  {response}
                </ReactMarkdown>
              )}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="col-span-4 mx-8">
          <div className='sticky top-headerHeight z-10 mt-md flex max-h-[calc(100vh_-var(--header-height))] flex-col pt-md' >

            <div className="grid grid-cols-1 gap-4">

              {[...Array(5)].map((_, index) => (
                <div key={index} className="col-span-1 bg-darkGray h-24 w-48 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-darkGray via-black/5 to-darkGray animate-shimmer"></div>
                </div>
              ))}
            </div>

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
    </div>
  );
}

