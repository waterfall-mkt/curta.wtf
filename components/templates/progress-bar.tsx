import type { FC } from 'react';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ProgressBarProps = JSX.IntrinsicElements['div'] & {
  value: number;
  total: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ProgressBar: FC<ProgressBarProps> = ({ value, total, ...rest }) => {
  const percentage = (100 * value) / total;

  return (
    <div
      className="h-2 w-40 rounded-full bg-gray-350"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <div
        style={{ width: `${percentage}%` }}
        className="h-2 rounded-full bg-gray-150"
        role="presentation"
      />
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
