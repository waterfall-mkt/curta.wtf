'use client';

import { type FC, useEffect, useState } from 'react';

import CodeBlockLanguageLogo from './language-logo';
import {
  codeBlockContainerVariants,
  codeBlockHeaderFileNameContainerStyles,
  codeBlockHeaderFileNameIconStyles,
  codeBlockHeaderFileNameStyles,
  codeBlockHeaderStyles,
  codeBlockLineHighlightedStyles,
  codeBlockLineNumberStyles,
  codeBlockLineVariants,
  codeBlockPreVariants,
  codeBlockStyles,
} from './styles';
import { theme } from './theme';
import type { CodeBlockProps } from './types';
import clsx from 'clsx';
import { Check, Copy, File } from 'lucide-react';
import { Highlight } from 'prism-react-renderer';
import Prism from 'prismjs';
import { twMerge } from 'tailwind-merge';

import { IconButton } from '@/components/ui';

// Add support for additional languagaes
(typeof global === 'undefined' ? window : global).Prism = Prism;
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-tsx');
require('prismjs/components/prism-solidity');
require('prismjs/components/prism-c');
require('prismjs/components/prism-cpp');
require('prismjs/components/prism-python');

const CodeBlock: FC<CodeBlockProps> = ({
  className,
  fileName,
  headerLabel,
  language = 'none',
  logo,
  highlightLines = [],
  showLineNumbers = true,
  breakLines = false,
  roundedTop = true,
  children,
  ...rest
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const isMobile = isMounted ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) : false;

  const hasHeader = fileName !== undefined || headerLabel !== undefined;

  const Icon = logo
    ? logo
    : language === 'javascript' || language === 'js'
    ? CodeBlockLanguageLogo.JavaScript
    : language === 'typescript' || language === 'ts'
    ? CodeBlockLanguageLogo.TypeScript
    : language === 'jsx'
    ? CodeBlockLanguageLogo.React
    : language === 'tsx'
    ? CodeBlockLanguageLogo.React
    : language === 'solidity' || language === 'sol'
    ? CodeBlockLanguageLogo.Solidity
    : language === 'python' || language === 'py'
    ? CodeBlockLanguageLogo.Python
    : File;

  const copyToClipboard = () => {
    if (!copied) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    navigator.clipboard.writeText(children);
  };

  return (
    <div className={twMerge(clsx(codeBlockContainerVariants({ roundedTop }), className))}>
      {hasHeader ? (
        <div className={codeBlockHeaderStyles}>
          <div className={codeBlockHeaderFileNameContainerStyles}>
            <Icon className={codeBlockHeaderFileNameIconStyles} />
            <div className={codeBlockHeaderFileNameStyles}>{fileName}</div>
            {fileName !== undefined && headerLabel !== undefined ? (
              <hr className="h-4 w-[1px] border-l border-stroke" role="separator" />
            ) : null}
            <div>{headerLabel}</div>
          </div>
          <div className="flex items-center gap-2">
            <IconButton
              className="bg-gray-600 active:bg-gray-450"
              size="sm"
              variant="tertiary"
              intent="neutral"
              title="Copy to clipboard"
              onClick={copyToClipboard}
              type="button"
              aria-label="Copy to clipboard"
            >
              {copied ? <Check /> : <Copy />}
            </IconButton>
          </div>
        </div>
      ) : null}
      <Highlight prism={Prism} theme={theme} code={children} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <div className="relative">
            <pre
              className={codeBlockPreVariants({
                hasHeader: hasHeader || !roundedTop,
                breakLines,
              })}
              {...rest}
            >
              <code className={codeBlockStyles}>
                {tokens.map((line, i) => {
                  const { className, ...restLineProps } = getLineProps({ line });

                  return (
                    <div
                      key={i}
                      className={clsx(
                        className,
                        codeBlockLineVariants({ breakLines }),
                        highlightLines.includes(i + 1) ? codeBlockLineHighlightedStyles : '',
                      )}
                      {...restLineProps}
                    >
                      {showLineNumbers ? (
                        <div className={codeBlockLineNumberStyles}>{i + 1}</div>
                      ) : null}
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  );
                })}
                {!hasHeader ? (
                  <IconButton
                    size="sm"
                    className={clsx(
                      'absolute right-2 top-2 bg-gray-600 active:bg-gray-450',
                      isMobile ? 'flex' : 'hidden animate-in fade-in group-hover:flex',
                    )}
                    variant="tertiary"
                    intent="neutral"
                    title="Copy to clipboard"
                    onClick={copyToClipboard}
                    type="button"
                    aria-label="Copy to clipboard"
                  >
                    {copied ? <Check /> : <Copy />}
                  </IconButton>
                ) : null}
              </code>
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  );
};

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
