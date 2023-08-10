import { cva } from 'class-variance-authority';

export const codeBlockContainerVariants = cva(
  ['flex', 'flex-col', 'overflow-hidden', 'border', 'border-stroke'],
  {
    variants: {
      roundedTop: {
        true: ['rounded-xl'],
        false: ['rounded-b-xl', 'rounded-t-none'],
      },
    },
  },
);

export const codeBlockHeaderFileNameContainerStyles = 'flex items-center space-x-2 text-gray-150';

export const codeBlockHeaderFileNameIconStyles = 'w-4 h-4';

export const codeBlockHeaderFileNameStyles = 'text-sm text-ellipsis overflow-hidden line-clamp-1';

export const codeBlockHeaderStyles =
  'flex h-[2.75rem] grow items-center justify-between border-b border-stroke bg-gray-700 pl-4 pr-2 rounded-top-xl';

export const codeBlockLineHighlightedStyles = 'bg-blue-900 shadow-[inset_2px_0] shadow-blue-250';

export const codeBlockLineNumberStyles = 'mr-4 inline-block w-4 text-end text-gray-150 select-none';

export const codeBlockLineStyles = 'px-4 min-w-fit';

export const codeBlockPreVariants = cva(
  ['group', 'py-4', 'px-0', 'overflow-x-scroll', 'my-0', 'bg-gray-600'],
  {
    variants: {
      hasFileName: { true: ['rounded-b-xl', 'rounded-t-none'], false: ['rounded-xl'] },
    },
  },
);

export const codeBlockStyles = 'text-xs normal leading-5 flex flex-col min-w-fit';
