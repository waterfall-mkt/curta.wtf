import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const ComponentsDisplay: React.FC<JSX.IntrinsicElements['div']> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'grid w-full items-center justify-evenly gap-4 rounded-2xl border border-stroke bg-gray-450 py-8 md:rounded-3xl md:py-12',
          className,
        ),
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ComponentsDisplay;
