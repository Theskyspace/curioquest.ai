/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface ImageGridProps {
    loading: boolean;
    images?: { name: string; url: string; thumbnailUrl: string }[];
}

export default function ImageGrid({ loading, images = [] }: ImageGridProps) {
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
                </div>

            );
        } catch (e) {
            console.log(e);
        }
    }
}
