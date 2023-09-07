import { type FC, Fragment } from 'react';

import LeaderboardPuzzlesTableSkeletonDesktop from './desktop';
import LeaderboardPuzzlesTableSkeletonMobile from './mobile';

const LeaderboardPuzzlesTableSkeleton: FC = () => {
  return (
    <Fragment>
      <LeaderboardPuzzlesTableSkeletonDesktop />
      <LeaderboardPuzzlesTableSkeletonMobile />
    </Fragment>
  );
};

export default LeaderboardPuzzlesTableSkeleton;
