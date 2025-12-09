export const Loading = () => {
    return (
        <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Rotating Border */}
            <div className="absolute inset-0 rounded-full border-3 border-amber-500 border-t-transparent border-b-transparent animate-spin"></div>

            {/* Center Logo */}
            <img
                src="/loading_logo.JPG"
                alt="loading"
                className="w-full h-full z-index-[-1] rounded-full object-cover"
            />
        </div>
    );
};
