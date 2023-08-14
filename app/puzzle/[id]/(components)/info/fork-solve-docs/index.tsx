'use client';

import type { FC } from 'react';

import PuzzleInfoForkSolveDocsContent from './content.mdx';

const PuzzleInfoForkSolveDocs: FC = () => {
  return (
    <div className="flex flex-col items-start py-4">
      <div className="prose max-w-full grow dark:prose-invert prose-h3:mb-2 prose-h3:px-4 prose-h3:text-lg prose-h3:font-semibold prose-h3:tracking-tight prose-h3:text-gray-50 prose-ol:mx-4 prose-ol:my-2 prose-ol:pl-4 prose-li:pl-1 prose-li:text-sm prose-li:font-medium prose-li:text-gray-100 prose-li:marker:text-gray-200">
        <PuzzleInfoForkSolveDocsContent />
      </div>
    </div>
  );
};

export default PuzzleInfoForkSolveDocs;
