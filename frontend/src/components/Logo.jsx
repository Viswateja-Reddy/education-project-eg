import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = ({ className = '' }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate('/')}
      className={`group cursor-pointer select-none transform transition-all duration-300 hover:scale-105 ${className}`}
    >
      <div className="relative inline-block">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
        <div className="relative flex items-center px-4 py-2 bg-white rounded-lg shadow-sm">
          <div className="transform -skew-x-12 flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-2">
              <span className="transform skew-x-12">E</span>
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <span className="transform skew-x-12 inline-block">xam</span>
              <span className="transform -skew-x-6 inline-block ml-0.5">Sync</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
