import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative w-20 h-20">
        {/* Outer spinning ring */}
        <div className="absolute w-full h-full border-4 border-t-blue-500 border-r-blue-400 border-b-blue-300 border-l-blue-200 rounded-full animate-spin"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6">
          <div className="w-full h-full bg-blue-500 rounded-full animate-ping opacity-75"></div>
        </div>
        
        {/* Center static circle */}
        <div className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
