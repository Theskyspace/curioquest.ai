"use client"
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FiArrowRight } from 'react-icons/fi';

export default function MainPrompt() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const makeChatId = (query: string) => {
    const truncatedQuery = query.toLowerCase().replace(/\s/g, '-').substring(0, 100);
    const randomSequence = Math.random().toString(36).substring(2, 8);
    return `${truncatedQuery}-${randomSequence}`;
  }

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [query]);

  const handleSearch = async () => {
    if (query.trim()) {
      setLoading(true);
      try {
        const res = await axios.post('/api/query', { query });
        const result = res.data.answer;

        sessionStorage.setItem('searchQuery', query);
        sessionStorage.setItem('searchResult', result);

        router.push('/search/' + makeChatId(query));
      } catch (error) {
        console.error('Error fetching result:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-screen w-full p-4 sm:p-8 animate-fadeIn ">
      <h1 className="text-4xl font-regular text-text mb-8 text-center">What do you want to know?</h1>
      <div className="relative w-full max-w-xl p-4 border bg-primary border-border rounded-xl shadow-md flex flex-col min-h-[100px]">

        <textarea
          ref={textAreaRef}
          className="w-full bg-transparent text-text rounded-lg resize-none focus:outline-none mb-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me anything..."
          rows={2} // Initial minimum rows for text area
        />

        {/* Button at Bottom */}
        <div className="flex justify-end">
          <button
            className={`p-2 text-text rounded-full shadow focus:outline-none ${query.trim() ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-background '
              }`}
            onClick={handleSearch}
            disabled={loading || !query.trim()}
          >
            <FiArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
