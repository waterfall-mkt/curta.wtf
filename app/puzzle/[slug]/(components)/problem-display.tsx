'use client';

import { type FC, useState } from 'react';

import type { Puzzle } from '@/lib/types/protocol';
import { getChainInfo } from '@/lib/utils';

import LogoIcon from '@/components/common/logo-icon';
import { CodeBlock } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleProblemDisplayProps = {
  puzzle: Puzzle;
  languages: string[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleProblemDisplay: FC<PuzzleProblemDisplayProps> = ({ puzzle, languages }) => {
  const [language, setLanguage] = useState<string>(() =>
    puzzle.solidity ? 'Solidity' : puzzle.huff ? 'Huff' : 'Bytecode',
  );

  const props = {
    className: 'min-h-[8.75rem] grow w-full',
    style: { maxHeight: '38.5rem' },
    fileName: 'Puzzle',
    headerLabel: (
      <div className="flex items-center gap-1 py-0.5 text-sm">
        <a
          className="-mx-0.5 rounded-sm px-0.5 font-medium text-gray-100 hover:underline"
          href={`https://${getChainInfo(puzzle.chainId).blockExplorer}/address/${
            getChainInfo(puzzle.chainId).puzzles
          }`}
          target="_blank"
          rel="noreferrer"
        >
          Curta
        </a>
        <span>calls</span>
        <code className="rounded-md border border-stroke bg-gray-450 px-1 py-0.5 text-xs font-normal text-gray-100">
          verify()
        </code>
      </div>
    ),
    switcher: {
      options: languages,
      value: language,
      onChange: (value: string) => setLanguage(value),
    },
  };

  if (puzzle.solidity && language === 'Solidity') {
    return (
      <CodeBlock language="solidity" {...props}>
        {puzzle.solidity}
      </CodeBlock>
    );
  }

  if (puzzle.huff && language === 'Huff') {
    return (
      <CodeBlock language="cpp" logo={LogoIcon.Huff} {...props}>
        {puzzle.huff}
      </CodeBlock>
    );
  }

  return (
    <CodeBlock language="none" showLineNumbers={false} breakLines {...props}>
      {puzzle.bytecode}
    </CodeBlock>
  );
};

export default PuzzleProblemDisplay;
