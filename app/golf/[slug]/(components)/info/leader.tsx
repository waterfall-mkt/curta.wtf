import type { GolfCourseValue } from '../types';
import { ExternalLink } from 'lucide-react';

import { formatValueToPrecision, getChainInfo } from '@/lib/utils';

import AddressLinkClient from '@/components/templates/address-link-client';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseInfoLeaderProps = {
  course: GolfCourseValue;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseInfoLeader: React.FC<CourseInfoLeaderProps> = ({ course }) => {
  return (
    <div className="flex grow flex-col items-center gap-2 p-4">
      {course.leader?.address ? (
        <a
          className="relative flex w-full flex-col items-center justify-center rounded-lg bg-tw-green py-2.5"
          href={`https://${getChainInfo(course.chainId).blockExplorer}/tx/${course.leaderTx}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="text-center text-sm font-book text-[#09491E]">King of the Hill</div>
          <AddressLinkClient
            className="text-2xl font-medium text-gray-50"
            address={course.leader.address as `0x${string}`}
          />
          <ExternalLink className="absolute right-2 top-2 h-3 w-3 text-[#09491E]" />
        </a>
      ) : (
        <div className="group relative flex w-full flex-col items-center justify-center rounded-lg bg-gray-350 py-2.5">
          <div className="text-center text-sm font-book text-gray-150">King of the Hill</div>
          <div className="text-2xl font-medium text-gray-50">—</div>
        </div>
      )}
      {[
        {
          name: 'Gas Used',
          value: course.leaderGas ? formatValueToPrecision(course.leaderGas, 2) : '—',
          title: course.leaderGas ? String(course.leaderGas) : undefined,
        },
        { name: 'Total Submissions', value: course._count.solves },
      ].map(({ name, value, title }) => {
        const nameId = `stat-name-${name.replace(' ', '-').toLowerCase()}`;
        const valueId = `stat-value-${name.replace(' ', '-').toLowerCase()}`;

        return (
          <div key={name} className="flex w-full items-center justify-between text-sm">
            <label id={nameId} htmlFor={valueId} className="text-gray-200">
              {name}
            </label>
            <div id={valueId} className="text-gray-100" title={title} aria-describedby={nameId}>
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseInfoLeader;
