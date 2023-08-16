import { cva } from 'class-variance-authority';

export const inputIconContainerVariants = cva(
  [
    'w-fit',
    'h-fit',
    'text-gray-200',
    'peer-invalid:text-red-300',
    'absolute',
    'top-0',
    'bottom-0',
    'justify-center',
    'my-auto',
    'flex',
    'items-center',
  ],
  {
    variants: {
      position: {
        left: ['left-2'],
        right: ['right-2'],
      },
    },
  },
);
