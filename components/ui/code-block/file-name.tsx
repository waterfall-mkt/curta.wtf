'use client';

import { type FC, type UIEvent, useState } from 'react';

import {
  codeBlockHeaderFileNameContainerHideOverflowVariants,
  codeBlockHeaderFileNameContainerStyles,
  codeBlockHeaderFileNameIconStyles,
  codeBlockHeaderFileNameStyles,
} from './styles';
import type { CodeBlockFileNameProps } from './types';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CodeBlockFileName: FC<CodeBlockFileNameProps> = ({
  fileName,
  headerLabel,
  containerized,
  Icon,
}) => {
  const [scrollIsAtLeft, setScrollIsAtLeft] = useState<boolean>(true);
  const [scrollIsAtRight, setScrollIsAtRight] = useState<boolean>(false);

  const onScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollLeft = target.scrollLeft;
    const scrollWidth = target.scrollWidth;
    const clientWidth = target.clientWidth;

    setScrollIsAtLeft(scrollLeft === 0);
    setScrollIsAtRight(scrollWidth - scrollLeft === clientWidth);
  };

  return (
    <div className="hide-scrollbar relative grow overflow-x-scroll">
      <div className={codeBlockHeaderFileNameContainerStyles} onScroll={onScroll}>
        <span>
          <Icon className={codeBlockHeaderFileNameIconStyles} />
        </span>
        <span className={codeBlockHeaderFileNameStyles}>{fileName}</span>
        {fileName !== undefined && headerLabel !== undefined ? (
          <hr className="h-4 w-[1px] border-l border-stroke" role="separator" />
        ) : null}
        <div>{headerLabel}</div>
      </div>
      <div
        className={codeBlockHeaderFileNameContainerHideOverflowVariants({
          side: 'left',
          visible: !scrollIsAtLeft,
          containerized,
        })}
      />
      <div
        className={codeBlockHeaderFileNameContainerHideOverflowVariants({
          side: 'right',
          visible: !scrollIsAtRight,
          containerized,
        })}
      />
    </div>
  );
};

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

CodeBlockFileName.displayName = 'CodeBlockFileName';

export default CodeBlockFileName;
