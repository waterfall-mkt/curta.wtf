'use client';

import { type FC, useEffect, useState } from 'react';

import { codeBlockActionsVariants } from './styles';
import type { CodeBlockActionsProps } from './types';
import { Check, Copy } from 'lucide-react';

import { IconButton, Select } from '@/components/ui';

const CodeBlockActions: FC<CodeBlockActionsProps> = ({ code, switcher, inHeader }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  const isMobile = mounted ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) : false;

  const copyToClipboard = () => {
    if (!copied) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    navigator.clipboard.writeText(code);
  };

  return (
    <div
      className={codeBlockActionsVariants({ inHeader: Boolean(inHeader), showOnHover: !isMobile })}
    >
      {switcher && switcher.options.length > 1 ? (
        <Select
          className="bg-gray-600 active:bg-gray-450"
          size="sm"
          variant="outline"
          intent="neutral"
          value={switcher.value}
          onChange={(e) => switcher.onChange(e.target.value)}
          aria-label="Select a language for the code block."
        >
          {switcher.options.map((option, index) => (
            <Select.Item key={index}>{option}</Select.Item>
          ))}
        </Select>
      ) : null}
      <IconButton
        size="sm"
        className="bg-gray-600 active:bg-gray-450"
        variant="outline"
        intent="neutral"
        title="Copy to clipboard"
        onClick={copyToClipboard}
        type="button"
        aria-label="Copy to clipboard"
      >
        {copied ? <Check /> : <Copy />}
      </IconButton>
    </div>
  );
};

export default CodeBlockActions;
