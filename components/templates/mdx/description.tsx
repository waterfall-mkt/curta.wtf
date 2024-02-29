import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Description: React.FC<JSX.IntrinsicElements['p']> = ({ className, ...rest }) => {
  return (
    <p
      className={twMerge(clsx('not-prose mb-6 mt-4 text-lg text-gray-150 md:mb-12', className))}
      {...rest}
    />
  );
};

export default Description;
