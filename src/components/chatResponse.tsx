/* eslint-disable @typescript-eslint/no-explicit-any */
// ResponseItemComponent.tsx

import React from 'react';
import HorizontalGrid from '@/components/sources';
import ImageGrid from '@/components/imageGrid';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ResponseItem {
    question: string;
    answer: string | null;
    context: any;
    isLoading: boolean;
}

interface ResponseItemComponentProps {
    responseItem: ResponseItem;
    isContextLoading: boolean;
    renderers: any;
}

const ResponseItemComponent: React.FC<ResponseItemComponentProps> = ({ responseItem, isContextLoading, renderers }) => (
    <div className="md:grid grid-cols-12 text-text gap-xl mb-12">
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
                        <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose" components={renderers}>
                            {responseItem.answer || 'Failed to fetch answer'}
                        </ReactMarkdown>
                    )}
                </div>
            </div>
        </div>

        <div className="col-span-4 mx-8">
            <div className="sticky top-headerHeight z-10 mt-md flex max-h-[calc(100vh_-var(--header-height))] flex-col pt-md">
                <ImageGrid loading={isContextLoading} images={responseItem.context?.searchEngine?.images || []} query={responseItem.question} />
            </div>
        </div>
    </div>
);

export default ResponseItemComponent;
