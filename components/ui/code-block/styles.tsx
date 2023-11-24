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
    'border-stroke',
    'relative',
    'hide-scrollbar',
    'h-fit',
  ],
  {
    variants: {
      roundedTop: {
        true: [],
        false: [],
      },
      containerized: {
        true: ['bg-gray-600', 'border'],
        false: ['bg-gray-450', 'border-y'],
      },
    },
    compoundVariants: [
      { roundedTop: true, containerized: true, className: ['rounded-xl'] },
      { roundedTop: true, containerized: false, className: [''] },
      { roundedTop: false, containerized: true, className: ['rounded-b-xl'] },
      { roundedTop: false, containerized: false, className: [''] },
    ],
  },
);

export const codeBlockHeaderFileNameContainerHideOverflowVariants = cva(
  ['pointer-events-none', 'absolute', 'top-0', 'h-full', 'w-4', 'transition-opacity'],
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
      containerized: {
        true: ['from-gray-700'],
        false: ['from-gray-450'],
      },
    },
  },
);

export const codeBlockHeaderFileNameContainerStyles =
  'flex items-center space-x-2 text-gray-150 overflow-x-scroll hide-scrollbar';

export const codeBlockHeaderFileNameIconStyles = 'w-4 h-4';

export const codeBlockHeaderFileNameStyles = 'text-sm';

export const codeBlockHeaderVariants = cva(
  [
    'flex',
    'min-h-[2.75rem]',
    'grow',
    'items-center',
    'justify-between',
    'border-b',
    'border-stroke',
    'pl-4',
    'pr-2',
    'sticky',
    'top-0',
    'z-10',
  ],
  {
    variants: {
      containerized: {
        true: ['rounded-t-xl', 'bg-gray-700'],
        false: ['bg-gray-450'],
      },
    },
  },
);

export const codeBlockLineHighlightedStyles = 'bg-blue-900 shadow-[inset_2px_0] shadow-blue-250';

export const codeBlockLineNumberStyles = 'mr-4 inline-block w-4 text-end text-gray-150 select-none';

export const codeBlockLineSkeletonStyles = 'h-4 w-full animate-pulse rounded-sm bg-gray-350';

export const codeBlockLineVariants = cva(['px-4', 'min-w-fit', 'flex'], {
  variants: {
    breakLines: { true: ['break-all'], false: [] },
  },
});

export const codeBlockPreVariants = cva(['group', 'py-4', 'px-0', 'my-0', 'hide-scrollbar'], {
  variants: {
    hasHeader: { true: [], false: [] },
    breakLines: { true: ['whitespace-pre-line'], false: ['overflow-x-scroll', 'hide-scrollbar'] },
    containerized: { true: ['bg-gray-600'], false: ['bg-gray-450'] },
  },
  compoundVariants: [
    { hasHeader: true, containerized: true, className: ['rounded-b-xl'] },
    { hasHeader: true, containerized: false, className: [''] },
    { hasHeader: false, containerized: true, className: ['rounded-xl'] },
    { hasHeader: false, containerized: false, className: [''] },
  ],
});

export const codeBlockStyles = ['text-xs', 'normal', 'leading-5', 'flex', 'flex-col', 'min-w-fit'];
