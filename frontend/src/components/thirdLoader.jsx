
import React from 'react';
import { Link } from 'react-router-dom';

const thirdLoader = ({ size = 'large' }) => {
    const sizeClass = size === 'small' ? 'w-5 h-5 border-2' : 'w-12 h-12 border-4';
    return (
      <div className="flex justify-center items-center">
        <div className={`border-t-transparent border-white ${sizeClass} border-solid rounded-full animate-spin`}></div>
      </div>
    );
  };
  
  export default thirdLoader;