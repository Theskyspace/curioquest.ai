"use client"
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowRight } from 'react-icons/fi';
import { toast } from 'sonner';


export default function MainPrompt() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [greeting, setGreeting] = useState<string>('');
  const router = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning ☀️');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good Afternoon 🌤️');
    } else {
      setGreeting('Good Evening 🌙');
    }
  }, []);

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
        sessionStorage.setItem('searchQuery', query);
        router.push('/search/' + makeChatId(query));
      } catch (error) {
        toast.error('Failed to navigate to search page');
        console.error('Failed to navigate to search page', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 sm:p-8 animate-fadeIn bg-gradient-to-b from-background to-secondary/20 relative">
      <h2 className="absolute 
        text-lg sm:text-xl md:text-2xl 
        font-light text-white
        top-4 left-4 
        sm:top-6 sm:left-6 
        md:top-8 md:left-8
        lg:top-8 lg:left-8">
        {greeting}
      </h2>
      <h1 className="text-5xl font-light text-text mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
        What do you want to know?
      </h1>
      <p className="text-text/60 mb-8 text-center">Explore the universe of knowledge with a simple question</p>
      
      <div className="relative w-full max-w-xl p-6 border bg-primary/80 border-border rounded-2xl 
        shadow-[0_0_15px_rgba(0,0,0,0.1)] 
        hover:shadow-[0_0_25px_rgba(6,182,212,0.10)] 
        backdrop-blur-sm transition-all duration-500">
        <textarea
          ref={textAreaRef}
          className="w-full bg-transparent text-text rounded-lg resize-none focus:outline-none mb-4 placeholder:text-text/40"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me anything..."
          rows={2} // Initial minimum rows for text area
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSearch();
            }
          }}
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
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 mt-8 w-full max-w-xl">
        {[
          {
            suggestion: 'Swap two numbers in python', emoji: "⌨️"
          },
          { suggestion: 'Taxation In India', emoji: "💰" },
          {
            suggestion: 'How to make dal makhni', emoji: "🥗"
          },
          { suggestion: 'What\'s Limechat?', emoji: "⛩️" }
        ].map((suggestion, index) => (
          <div
            key={index}
            className="p-2 border border-border rounded-xl shadow-md flex items-center cursor-pointer hover:bg-secondary transition-colors w-full md:w-[calc(50%-0.5rem)]"
            onClick={() => {
              sessionStorage.setItem('searchQuery', suggestion.suggestion);
              router.push('/search/' + makeChatId(suggestion.suggestion));
            }}
          >
            <div className="bg-primary rounded-xl flex items-center justify-center mr-4 w-8 h-8">
              <span role="img" aria-label="emoji">{suggestion.emoji}</span>
            </div>
            <p className="text-text text-sm">{suggestion.suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
