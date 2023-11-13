'use client';

import { type FC, useState } from 'react';

import type { Puzzle } from '@/lib/types/protocol';
import { getChainInfo } from '@/lib/utils';

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
      <div className="flex items-center gap-1 text-sm">
        <a
          className="font-medium text-gray-100 hover:underline"
          href={`https://${getChainInfo(puzzle.chainId).blockExplorer}/address/${
            getChainInfo(puzzle.chainId).puzzlesAddress
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
      <CodeBlock language="cpp" logo={HuffIcon} {...props}>
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

const HuffIcon: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>Huff</title>
      <desc>Huff&apos;s logo.</desc>
      <path
        d="M14.074 1.218c.856.26 2.268 1.05 2.268 1.267 0 .06-.187.186-.415.28-.744.309-.773.458-.279 1.461.247.502.445 1.087.44 1.3-.012.55.496 1.81 1.046 2.593.641.912.334 2.634-.448 2.508-.15-.024-.526-.064-.833-.088-.455-.036-.608-.126-.816-.478-.184-.312-.421-.476-.84-.581-.677-.17-1.014-.32-1.474-.653l-.332-.24.332.652c.182.358 1 1.333 1.816 2.166 2.15 2.192 2.636 3.44 1.654 4.24-.423.346-.47.453-.445 1.026.04.905-.036.926-3.427.926-3.308 0-3.503-.05-3.345-.838.08-.402.032-.513-.383-.884l-.475-.424.277-.641c.152-.353.302-.987.332-1.41l.056-.77-.3.95-.298.949-.328-.939c-.434-1.238-.415-1.685.097-2.284.228-.266.414-.577.414-.69 0-.113-.202.058-.45.38-.562.731-.6.729-.798-.058-.197-.784-.125-1.036.488-1.704.665-.724.6-.847-.132-.248l-.612.502-.16-.634c-.16-.638.062-1.33.428-1.33.161 0 .816-.694.816-.865 0-.07-.121-.013-.27.125-.148.138-.456.36-.684.494l-.414.244-.092-.49c-.14-.744.152-1.217.904-1.467.726-.242.976-.385.976-.56 0-.069-.205-.042-.455.06-1.11.449-1.209.427-1.065-.235.153-.705.548-1.08 1.15-1.093.836-.019 1.066-.25.26-.26-1.324-.018-.173-1.402 1.18-1.42.81-.01.814-.012.35-.18-1.634-.592 2.447-1.218 4.286-.659m-2.418.876a6.1 6.1 0 0 1 .675.486c.217.18.461.327.542.327.256 0-.195-.427-.748-.71-.561-.286-.942-.37-.47-.103m-.35.297c0 .1.094.305.209.454.19.249.195.233.056-.183-.158-.474-.264-.583-.264-.271m-.532 3.597c-.744.943-.903 2.367-.392 3.508.204.456.209.458.114.056-.233-.986-.11-2.246.267-2.744.627-.826.637-1.613.011-.82m3.916-.152c.184.294.494.42.791.32.126-.042.056-.152-.21-.326-.542-.358-.806-.355-.58.006m-2.816 3.576c-.002.137 1.355 1.892 2.004 2.591.54.582 1.064 1.755 1.064 2.383 0 .624.31.733.397.138.138-.944-.3-1.733-1.936-3.481-.577-.617-1.156-1.268-1.288-1.446-.13-.179-.24-.261-.24-.185m2.924 8.602c.149.08.296.367.349.677.06.356.306.785.726 1.264 1.017 1.163 1.089 1.14-3.516 1.14H8.368v-.324c0-.18.192-.507.432-.735.528-.501.827-1.05.827-1.516 0-.192.11-.414.245-.492.316-.185 4.587-.196 4.928-.014m-1.955.422c0 .078.37.14.83.14.458 0 .87-.063.918-.14.055-.088-.255-.14-.83-.14-.52 0-.918.061-.918.14m4.268 3.158c.58.275.86.58.982 1.074l.096.385h-5.82c-6.369 0-6.126.034-5.583-.794.532-.813.952-.879 5.616-.882 3.574-.003 4.319.032 4.709.217m-2.728.199c-.244.15.067.232 1.02.266.904.033 1.403-.077 1.278-.28-.095-.154-2.047-.142-2.298.014"
        fill="currentColor"
      />
    </svg>
  );
};

export default PuzzleProblemDisplay;
