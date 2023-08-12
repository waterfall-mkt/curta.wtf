import { cva } from 'class-variance-authority';

// ---------------------------------------–-------------------------------------
// `CodeBlockAction` styles
// ---------------------------------------–-------------------------------------

export const codeBlockActionsVariants = cva(['flex', 'items-center', 'gap-2'], {
  variants: {
    inHeader: {
      true: ['flex', 'ml-2'],
      false: ['absolute', 'right-2', 'top-2'],
    },
    showOnHover: {
      true: [],
      false: [],
    },
  },
  compoundVariants: [
    {
      inHeader: false,
      showOnHover: true,
      className: ['hidden', 'animate-in', 'fade-in', 'group-hover:flex'],
    },
    { inHeader: false, showOnHover: false, className: ['flex'] },
  ],
});

// ---------------------------------------–-------------------------------------
// `CodeBlock` styles
// ---------------------------------------–-------------------------------------

export const codeBlockContainerVariants = cva(
  [
    'flex',
    'flex-col',
    'grow',
    'overflow-y-scroll',
    'border',
    'border-stroke',
    'relative',
    'bg-gray-600',
    'hide-scrollbar',
  ],
  {
    variants: {
      roundedTop: {
        true: ['rounded-xl'],
        false: ['rounded-b-xl', 'rounded-t-none'],
      },
    },
  },
);

export const codeBlockHeaderFileNameContainerHideOverflowVariants = cva(
  [
    'pointer-events-none',
    'absolute',
    'top-0',
    'h-full',
    'w-4',
    'from-gray-700',
    'transition-opacity',
  ],
  {
    variants: {
      side: {
        left: ['bg-gradient-to-r', 'left-0'],
        right: ['bg-gradient-to-l', 'right-0'],
      },
      visible: {
        true: ['opacity-100'],
        false: ['opacity-0'],
      },
    },
  },
);

export const codeBlockHeaderFileNameContainerStyles =
  'flex items-center space-x-2 text-gray-150 overflow-x-scroll hide-scrollbar';

export const codeBlockHeaderFileNameIconStyles = 'w-4 h-4';

export const codeBlockHeaderFileNameStyles = 'text-sm';

export const codeBlockHeaderStyles =
  'flex min-h-[2.75rem] max-h-[2.75rem] grow items-center justify-between border-b border-stroke bg-gray-700 pl-4 pr-2 rounded-top-xl sticky top-0 z-10';

export const codeBlockLineHighlightedStyles = 'bg-blue-900 shadow-[inset_2px_0] shadow-blue-250';

export const codeBlockLineNumberStyles = 'mr-4 inline-block w-4 text-end text-gray-150 select-none';

export const codeBlockLineVariants = cva(['px-4 min-w-fit'], {
  variants: {
    breakLines: { true: ['break-all'], false: [] },
  },
});

export const codeBlockPreVariants = cva(
  ['group', 'py-4', 'px-0', 'my-0', 'bg-gray-600', 'hide-scrollbar'],
  {
    variants: {
      hasHeader: { true: ['rounded-b-xl', 'rounded-t-none'], false: ['rounded-xl'] },
      breakLines: { true: ['whitespace-pre-line'], false: ['overflow-x-scroll'] },
    },
  },
);

export const codeBlockStyles = 'text-xs normal leading-5 flex flex-col min-w-fit';
