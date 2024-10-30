export default function HorizontalGrid() {
    return (
        <div className="w-full">
            <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto scrollbar-hide">
                {/* Container for each item */}
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between p-3 rounded-lg shadow-md bg-darkGray min-w-[200px] h-24 w-48 text-white"
                    >
                        {/* Title */}
                        <div className="flex-1 mb-1">
                            <h3 className="text-sm line-clamp-2 leading-tight">
                                Some random saying from source
                            </h3>
                        </div>

                        {/* Source and Logo */}
                        <div className="flex items-center justify-between mt-2">
                            {/* Logo */}
                            <div className="w-5 h-5 flex-shrink-0 bg-blue-200 rounded-full flex items-center justify-center">
                                {/* Add logo or icon inside here */}
                            </div>

                            {/* Source Text */}
                            <div className="ml-2 flex-1">
                                <h3 className="text-xs text-gray-400 truncate">
                                    theskyspace.tech
                                </h3>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}
