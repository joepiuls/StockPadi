import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
