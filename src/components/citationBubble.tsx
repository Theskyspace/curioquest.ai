import React from 'react';

interface CitationBubbleProps {
    number: number[];
}

const CitationBubble: React.FC<CitationBubbleProps> = ({ number }) => {
    return (
        <span className="relative group">
            <sup className="cursor-pointer text-blue-500">[{number}]</sup>
            {/* <div className="absolute bottom-8 left-0 z-10 hidden w-64 p-2 bg-white border rounded shadow-lg group-hover:block">
                <p className="text-xs text-gray-500">Author, Date, Source</p>
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div> */}
        </span>
    );
};

export default CitationBubble;
