/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { toast } from 'sonner';

interface ImageGridProps {
    loading: boolean;
    images?: { name: string; url: string; thumbnailUrl: string }[];
    query: string;
}

export default function ImageGrid({ loading, images = [], query }: ImageGridProps) {
    console.log(images);
    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-4">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="col-span-1 bg-darkGray h-24 w-48 rounded-lg relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-darkGray via-black/5 to-darkGray animate-shimmer"></div>
                    </div>
                ))}
            </div>
        );
    } else {
        try {
            return (
                <div className="flex flex-row md:grid md:grid-rows-1 md:grid-cols-2 gap-4">

                    {images.slice(0, 5).map((image, index) => (

                        <div
                            key={image.url}
                            className={`${index === 0 ? 'md:col-span-2 md:h-48' : 'h-24'
                                } w-full bg-darkGray rounded-lg relative overflow-hidden group`}
                        >
                            <img
                                src={image.thumbnailUrl}
                                alt={image.name}
                                className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-50"></div>
                        </div>
                    ))}
                    {images.length === 0 && (
                        <div
                            className="p-2 md:col-span-2 border bg-primary border-border rounded-xl shadow-md flex items-center cursor-pointer hover:bg-secondary w-full"
                            onClick={() => window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`, '_blank')}
                        >
                            <div className="bg-background rounded-xl flex items-center justify-center mr-4 w-8 h-8">
                                <span role="img" aria-label="emoji">📷</span>
                            </div>
                            <p className="text-text text-sm">Search more images</p>
                        </div>
                    )}
                </div>

            );
        } catch (e) {
            toast.error('Failed to load images');
            console.log(e);
        }
    }
}
