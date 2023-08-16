'use client';

import type { FC } from 'react';

import CodeBlockActions from './actions';
import CodeBlockFileName from './file-name';
import CodeBlockLanguageLogo from './language-logo';
import {
  codeBlockContainerVariants,
  codeBlockHeaderVariants,
  codeBlockLineHighlightedStyles,
  codeBlockLineNumberStyles,
  codeBlockLineVariants,
  codeBlockPreVariants,
  codeBlockStyles,
} from './styles';
import { theme } from './theme';
import type { CodeBlockProps } from './types';
import clsx from 'clsx';
import { File, TerminalSquare } from 'lucide-react';
import { Highlight } from 'prism-react-renderer';
import Prism from 'prismjs';
import { twMerge } from 'tailwind-merge';

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
require('prismjs/components/prism-bash');

const CodeBlock: FC<CodeBlockProps> = ({
  className,
  fileName,
  headerLabel,
  language = 'none',
  logo,
  switcher,
  highlightLines = [],
  showLineNumbers = true,
  breakLines = false,
  roundedTop = true,
  containerized = true,
  children,
  ...rest
}) => {
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
    : language === 'bash' || language === 'sh'
    ? TerminalSquare
    : File;

  return (
    <div
      className={twMerge(
        clsx(codeBlockContainerVariants({ roundedTop, containerized }), className),
      )}
    >
      {hasHeader ? (
        <div className={codeBlockHeaderVariants({ containerized })}>
          <CodeBlockFileName
            fileName={fileName}
            headerLabel={headerLabel}
            containerized={containerized}
            Icon={Icon}
          />
          <CodeBlockActions code={children} switcher={switcher} inHeader />
        </div>
      ) : null}
      <Highlight prism={Prism} theme={theme} code={children} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <div className="relative">
            <pre
              className={codeBlockPreVariants({
                hasHeader: hasHeader || !roundedTop,
                breakLines,
                containerized,
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
              </code>
              {!hasHeader ? <CodeBlockActions code={children} switcher={switcher} /> : null}
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  );
};

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
