import React from 'react';

const WorkspaceSelector: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-3 rounded-md border border-black-700 bg-black-800 px-3 py-2 hover:bg-black-700 transition-colors cursor-pointer">
        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-black-50 font-bold">
          W
        </div>
        <span className="font-medium text-gray-300">Workspace</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default WorkspaceSelector;
