import { Fragment } from 'react';

import LeaderboardPuzzlesTableSkeletonDesktop from './desktop';
import LeaderboardPuzzlesTableSkeletonMobile from './mobile';

const LeaderboardPuzzlesTableSkeleton: React.FC = () => {
  return (
    <Fragment>
      <LeaderboardPuzzlesTableSkeletonDesktop />
      <LeaderboardPuzzlesTableSkeletonMobile />
    </Fragment>
  );
};

export default LeaderboardPuzzlesTableSkeleton;
