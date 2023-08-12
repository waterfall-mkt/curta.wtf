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
        left: ['left-1.5'],
        right: ['right-1.5'],
      },
      size: {
        sm: ['px-1'],
        md: ['px-1'],
        lg: ['px-1'],
      },
    },
  },
);
