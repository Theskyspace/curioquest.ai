import React from 'react';

interface CitationBubbleProps {
    numbers: number[];  // Array of citation numbers to display
    sources: { [key: number]: { url: string; snippet: string } };  // Mapping of citation number to source info
}

function getSiteName(url: string) {
    try {
        const parsedUrl = new URL(url);
        let hostname = parsedUrl.hostname;
        hostname = hostname.replace(/^(www\.|m\.|blog\.)*/, '');
        const domainParts = hostname.split('.');
        if (domainParts.length > 2) {
            hostname = domainParts.slice(-2).join('.');
        }

        return hostname;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}


const CitationBubble: React.FC<CitationBubbleProps> = ({ numbers, sources }) => {
    console.log("Sources", sources)
    return (
        <span className="citation-bubble">
            {numbers.map((number) => (
                <a
                    key={number}
                    href={sources[number]?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="citation-number"
                    data-tooltip={sources[number]?.snippet}
                >
                    {getSiteName(sources[number]?.url)}
                </a>
            ))}
        </span>
    );
};

export default CitationBubble;
