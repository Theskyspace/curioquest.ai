/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface SourceGridProps {
    loading: boolean;
    source_items?: { name: string; url: string; snippet: string }[];
}

export default function SourceGrid({ loading, source_items = [] }: SourceGridProps) {
    if (loading) {
        return (
            <div className="w-full h-full">
                <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto scrollbar-hide h-full min-h-24">
                    {/* Container for each item */}
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="col-span-1 bg-darkGray h-24 w-48 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-darkGray via-black/5 to-darkGray animate-shimmer"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    return (

        <div className="w-full h-full">
            <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto scrollbar-hide h-full">

                {source_items?.slice(0, 5).map((source_item: { name: string; url: string; snippet: string }, index: number) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between p-3 rounded-lg shadow-md bg-darkGray min-w-[200px] h-full w-48 text-white overflow-hidden"
                    >
                        {/* Title */}
                        <div className="flex-1 mb-1">
                            <h3 className="text-sm line-clamp-2 leading-tight">
                                {source_item.name}
                            </h3>
                        </div>

                        {/* Source and Logo */}
                        <div className="flex items-center justify-between mt-2">
                            {/* Logo */}
                            <div className="w-4 h-4 flex-shrink-0 bg-blue-200 rounded-full flex items-center justify-center">
                                <img src={`https://www.google.com/s2/favicons?domain=${source_item.url}`}
                                    alt="Source logo" className="object-cover w-full h-full  rounded-full" />
                            </div>

                            {/* Source Text */}
                            <div className="ml-2 flex-1">
                                <h3 className="text-xs text-gray-400 truncate">
                                    {source_item.url.split('/')[2]}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}
