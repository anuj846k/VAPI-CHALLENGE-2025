import Agent from '@/components/Agent';
import React from 'react';

const page = () => {
  return (
    <div className="relative mt-24 px-4 sm:px-8 py-16 min-h-screen bg-gradient-to-b from-blue-100 to-blue-400 flex flex-col items-center">
      <h3 className="text-4xl font-bold text-blue-950 mb-12">Sahara AI</h3>

      <div className="w-full max-w-6xl backdrop-blur-md bg-white/30 border border-white/40 shadow-2xl rounded-3xl p-4 sm:p-6">
        <Agent userName="User"/>
      </div>
    </div>
  );
};

export default page;
