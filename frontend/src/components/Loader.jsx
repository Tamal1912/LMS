import React from 'react';

const Loader = () => {
  return (
          <>
         
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-8">
      {/* Inspirational Quote */}
      <div className="text-center max-w-md">
        <p className="text-lg text-gray-600 italic">
          "Education is not preparation for life; education is life itself."
        </p>
        <p className="text-sm text-gray-500 mt-2">- John Dewey</p>
      </div>

      {/* Loader Animation */}
      <div className="relative w-20 h-20">
        {/* Book shape */}
        <div className="absolute w-full h-full border-4 border-indigo-500 rounded-lg animate-pulse"></div>
        
        {/* Pages flipping effect */}
        <div className="absolute top-1/2 left-1/2 w-16 h-16 -mt-8 -ml-8">
          <div className="w-full h-full border-r-4 border-indigo-400 rounded-r-lg animate-spin"></div>
        </div>
        
        {/* Graduation cap */}
        <div className="absolute -top-4 left-1/2 -ml-4">
          <div className="w-8 h-8 bg-indigo-600 transform rotate-45 animate-bounce">
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>

      {/* Loading text */}
      <p className="text-indigo-600 animate-pulse">Loading your learning journey...</p>
    </div>
          </>
  );
};

export default Loader;
