import type { GolfCourseValue } from '../types';
import CourseHeaderPageNav from './page-nav';
import { ExternalLink, Github } from 'lucide-react';

import { fetchCourseById, getChainInfo } from '@/lib/utils';

import { Button, ButtonGroup, IconButton, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseHeaderProps = {
  course: GolfCourseValue;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseHeader: React.FC<CourseHeaderProps> = async ({ course }) => {
  const [prevCourse, nextCourse] = await Promise.all([
    fetchCourseById(course.id - 1, course.chainId),
    fetchCourseById(course.id + 1, course.chainId),
  ]);

  const links = [
    {
      name: 'Source',
      href: `https://github.com/${course.github}`,
      icon: <Github />,
      disabled: !course.github,
    },
    {
      name: 'Contract',
      href: `https://${getChainInfo(course.chainId).blockExplorer}/address/${course.address}`,
      icon: <ExternalLink />,
      disabled: false,
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[90rem] flex-col justify-center gap-3 px-4 sm:flex-row sm:gap-0 lg:px-20">
      <div className="flex items-center gap-4">
        <CourseHeaderPageNav prevCourse={prevCourse} nextCourse={nextCourse} />
        <div className="flex grow items-center justify-between sm:gap-4">
          {[
            {
              name: `Course #${course.id}`,
              value: course.name ?? `Course ${course.id}`,
            },
          ].map((item, index) => (
            <div
              className="flex flex-col items-center gap-1 first:items-start sm:items-start"
              key={index}
            >
              <div className="text-sm leading-4 text-gray-150">{item.name}</div>
              <div className="-my-1 -mr-1 max-w-[13rem] overflow-hidden text-ellipsis whitespace-nowrap py-1 pr-1 font-medium leading-5 text-gray-50">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ButtonGroup className="ml-auto hidden sm:flex">
        {links.map((item, index) =>
          !item.disabled ? (
            <Tooltip content={item.name} key={index} inPortal>
              <IconButton href={item.href} variant="outline" intent="neutral" size="lg" newTab>
                {item.icon}
              </IconButton>
            </Tooltip>
          ) : null,
        )}
      </ButtonGroup>
      <ButtonGroup className="sm:hidden">
        {links.map((item, index) =>
          !item.disabled ? (
            <Button
              className="grow"
              key={index}
              href={item.href}
              variant="outline"
              intent="neutral"
              rightIcon={item.icon}
              newTab
            >
              {item.name}
            </Button>
          ) : null,
        )}
      </ButtonGroup>
    </div>
  );
};

export default CourseHeader;
