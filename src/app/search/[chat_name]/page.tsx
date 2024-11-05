/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CitationBubble from '@/components/citationBubble';
import ImageGrid from '@/components/imageGrid';
import HorizontalGrid from '@/components/sources';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FaStop } from 'react-icons/fa6';
import { FiArrowRight } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';

export default function ChatPage() {
  const [followup, setFollowup] = useState<string | null>(sessionStorage.getItem('searchQuery'));
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isContextLoading, setIsContextLoading] = useState<boolean>(true);

  interface ResponseItem {
    question: string;
    answer: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any;
    isLoading: boolean;
  }

  const [responses, setResponses] = useState<ResponseItem[]>([]);



  const handleFollowup = async () => {
    if (followup) {
      const newResponse = { question: followup, answer: null, context: null, isLoading: true };
      setResponses([...responses, newResponse]);
      setFollowup("");
      let context = null;
      try {
        const res = await axios.post('/api/get_context', { query: followup });
        context = res.data;
        setIsContextLoading(false);
        newResponse.context = res.data;
        setResponses((prevResponses) =>
          prevResponses.map((item, index) =>
            index === prevResponses.length - 1 // Update the latest response
              ? { ...item, context: res.data, isLoading: true }
              : item
          )
        );
        console.log("Context Response:", res.data);
      } catch (error) {
        console.log(error);
        toast.error('Failed to get context');
        setIsContextLoading(false);
        return;
      }


      // Scroll to the bottom of the page
      await setTimeout(() => {
        if (responses.length > 0) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      }, 100);


      try {
        const res = await axios.post('/api/get_answer', {
          query: followup,
          context: context.context
        });
        console.log("Answer Response:", res.data);
        setResponses((prevResponses) =>
          prevResponses.map((item, index) =>
            index === prevResponses.length - 1 // Update the latest response
              ? { ...item, answer: res.data.answer, isLoading: false }
              : item
          )
        );
      } catch (error) {
        toast.error("Failed to fetch answer.");
        console.log(error);
      }
    }

  };

  useEffect(() => {
    handleFollowup();
  }, []);

  const renderers = {
    p: ({ children }: any) => {
      console.log("Inside P tag : ", children)
      const textContent = children;

      if (typeof textContent === 'string') {
        const citationRegex = /\{([\d, ]+)\}/g;
        console.log("Inside Citation logic P : " + textContent);
        const elements: JSX.Element[] = [];
        let lastIndex = 0;
        let match;

        while ((match = citationRegex.exec(textContent)) !== null) {
          const matchStart = match.index;
          const matchEnd = match.index + match[0].length;
          const citationNumbers = match[1].split(',').map((num) => parseInt(num.trim()));
          if (lastIndex < matchStart) {
            elements.push(<span key={`text-${lastIndex}`}>{textContent.slice(lastIndex, matchStart)}</span>);
          }
          elements.push(<CitationBubble key={`citation-${matchStart}`} numbers={citationNumbers} sources={responses[responses.length - 1].context?.searchEngine?.webPages || {}

          } />);

          lastIndex = matchEnd;
        }

        // Add remaining text after the last match
        if (lastIndex < textContent.length) {
          elements.push(<span key={`text-${lastIndex}`}>{textContent.slice(lastIndex)}</span>);
        }

        return <p>{elements}</p>;
      }

      return <p>{children}</p>;
    },
    li: ({ children }: any) => {
      console.log("Inside P tag : ", children)
      const textContent = children;

      if (typeof textContent === 'string') {
        // Regex to match citations like {1,2,3} or {1}
        const citationRegex = /\{([\d, ]+)\}/g;
        console.log("Inside Citation logic : " + textContent);
        const elements: JSX.Element[] = [];
        let lastIndex = 0;
        let match;

        while ((match = citationRegex.exec(textContent)) !== null) {
          const matchStart = match.index;
          const matchEnd = match.index + match[0].length;
          const citationNumbers = match[1].split(',').map((num) => parseInt(num.trim()));

          // Add text before the citation
          if (lastIndex < matchStart) {
            elements.push(<span key={`text-${lastIndex}`}>{textContent.slice(lastIndex, matchStart)}</span>);
          }

          // Add the citation bubble
          elements.push(<CitationBubble key={`citation-${matchStart}`} numbers={citationNumbers} sources={responses[responses.length - 1].context?.searchEngine?.webPages || {}

          } />);

          lastIndex = matchEnd;
        }

        // Add remaining text after the last match
        if (lastIndex < textContent.length) {
          elements.push(<span key={`text-${lastIndex}`}>{textContent.slice(lastIndex)}</span>);
        }

        return <li>{elements}</li>;
      }

      return <li>{children}</li>;
    },

  };

  return (


    <div className='md:px-12 pt-12 p-4 lg:px-44 pb-24'>
      <div className="min-h-screen animate-fadeIn">

        {/* Loop over each question and response pair */}
        {/* TODO: Modularixe this element */}
        {responses.map((responseItem, index) => (
          <div key={index} className="md:grid grid-cols-12 text-text gap-xl mb-12">
            <div className="col-span-8">
              <h1 className="text-3xl">{responseItem.question}</h1>

              <div className="rounded-lg">
                <h2 className="text-xl mb-2">Sources</h2>
                <HorizontalGrid loading={isContextLoading} source_items={responseItem.context?.searchEngine?.webPages || []} />
              </div>

              <div className="rounded-lg">
                <h2 className="text-xl mb-2">Answer</h2>
                <div className="text-text">
                  {responseItem.isLoading ? (
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-4 bg-darkGray rounded animate-pulse"></div>
                      ))}
                    </div>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      className="prose"
                      components={renderers}
                    >{responseItem.answer || 'Failed to fetch answer'}</ReactMarkdown>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-4 mx-8">
              <div className='sticky top-headerHeight z-10 mt-md flex max-h-[calc(100vh_-var(--header-height))] flex-col pt-md'>
                <ImageGrid loading={isContextLoading} images={responseItem.context?.searchEngine?.images || []} query={responses[responses.length - 1].question} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Follow-up Input */}
      <div className="sticky bottom-10 z-20 w-full p-2 text-center md:grid grid-cols-12 text-text gap-xl animate-fadeInfromBottom">
        <div className="col-span-8 relative w-full p-4 border bg-primary border-border rounded-xl shadow-md flex flex-row min-h-[30px]">
          <textarea
            ref={textAreaRef}
            className="w-full bg-transparent text-text rounded-lg resize-none focus:outline-none mb-4"
            value={followup || ''}
            onChange={(e) => setFollowup(e.target.value)}
            placeholder="Ask a question..."
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleFollowup();
              }
            }}
          />
          <div className="flex justify-center items-end bg-cyan-600 hover:bg-cyan-700 rounded-full">
            <button
              className={`p-2 text-text rounded-full shadow focus:outline-none w-10 h-10 flex items-center justify-center `}
              onClick={handleFollowup}
              disabled={!followup || followup.length === 0 || responses[responses.length - 1]?.isLoading}
            >
              {responses[responses.length - 1]?.isLoading ? (
                <FaStop className="w-5 h-5" />
              ) : (
                <FiArrowRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
