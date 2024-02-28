'use client';

import { useEffect, useState } from 'react';

import { getPuzzleTimeLeft } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoTimeLeftTimelineProps = {
  firstSolveTimestamp: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfoTimeLeftTimeline: React.FC<PuzzleInfoTimeLeftTimelineProps> = ({
  firstSolveTimestamp,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);

  // Set `mounted` to true on page load
  useEffect(() => setMounted(true), []);

  const COLORS = { PHASE_0: '#22C55E', PHASE_1: '#FACC15', PHASE_2: '#F97316', PHASE_3: '#EF4444' };

  const { phase, timeLeft } = getPuzzleTimeLeft(firstSolveTimestamp);

  // The height of the unfilled portion of the timeline, adjusting for the small
  // gaps between the end of segments between circles and the circles. Note that
  // we don't render any portion of the unfilled timeline when `phase === 3`, so
  // the expression below assumes `phase` is bounded to `[0, 2]`. Helpful notes:
  //     * `Math.sqrt(35)` is the `y` coordinate of the circle when `x = 1`:
  //       `y**2 + x**2 = 6**2 => y = sqrt(35)`. Then, since the radius of each
  //       circle is 6, the aforementioned "small gaps" are each `sqrt(35)`
  //       pixels tall.
  //     * 44 is the height of the Phase 2-3 track, through the Phase 2 circle:
  //       `44 = (6 - sqrt(35)) + 32 + 12 - (6 - sqrt(35))`.
  //     * `44 - 2 * sqrt(35)` is the height of the portion of the track in
  //       in between 2 Phase indicator circles, given by
  //       `32 + 2 * (6 - sqrt(35))`.
  const unfilledTimelineHeight = mounted
    ? phase === 2
      ? (44 - 2 * Math.sqrt(35)) * (1 - timeLeft / 259_200)
      : phase === 1
      ? 44 + (44 - 2 * Math.sqrt(35)) * (1 - timeLeft / 172_800)
      : 132 - 2 * Math.sqrt(35) // Fill completely if `phase === 0`.
    : 132 - 2 * Math.sqrt(35); // Fill completely if component is unmounted.

  return (
    <svg
      width={12}
      height={168}
      viewBox="0 0 12 168"
      role="figure"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for the filled portion of the timeline with stops to lead
        into each of the circles properly (i.e. each "gradient" portion
        completely stops and resumes before/after encountering a circle's
        boundary). */}
        <linearGradient id="0" gradientTransform="rotate(90)">
          {/* Circle 1 middle. */}
          <stop offset={0} stopColor={COLORS.PHASE_0} />
          {/* Circle 1 end. */}
          <stop offset={6 / 132} stopColor={COLORS.PHASE_0} />
          <stop offset={6 / 132} stopColor={COLORS.PHASE_0} />
          {/* Circle 2 start. */}
          <stop offset={38 / 132} stopColor={COLORS.PHASE_1} />
          <stop offset={38 / 132} stopColor={COLORS.PHASE_1} />
          {/* Circle 2 end. */}
          <stop offset={50 / 132} stopColor={COLORS.PHASE_1} />
          <stop offset={50 / 132} stopColor={COLORS.PHASE_1} />
          {/* Circle 3 start. */}
          <stop offset={82 / 132} stopColor={COLORS.PHASE_2} />
          <stop offset={82 / 132} stopColor={COLORS.PHASE_2} />
          {/* Circle 3 end. */}
          <stop offset={94 / 132} stopColor={COLORS.PHASE_2} />
          <stop offset={94 / 132} stopColor={COLORS.PHASE_2} />
          {/* Circle 4 start. */}
          <stop offset={126 / 132} stopColor={COLORS.PHASE_3} />
          <stop offset={126 / 132} stopColor={COLORS.PHASE_3} />
          {/* Circle 4 middle. */}
          <stop offset={1} stopColor={COLORS.PHASE_3} />
        </linearGradient>
      </defs>
      {/* Filled portion of the timeline. We position both of the following
      portions of the timeline at x={5} because we want them horizontally
      centered.*/}
      <rect x={5} y={10} width={2} height={132} fill="url(#0)" />
      {/* Unfilled portion of the timeline. We position the rectangle at
      `y={142 - Math.sqrt(35) - unfilledTimelineHeight}` because we want it
      offset by both the height of the filled portion of the timeline (given by
      `132 - 2 * sqrt(35) - unfilledTimelineHeight`) and the top padding
      required to render it starting from the end of the first circle (with the
      small gap adjustment), which is given by
      `10 + 6 - (6 - sqrt(35)) = 10 + sqrt(35)`. Altogether, we have the
      following sum for the `y` coordinate:
      `132 - 2 * sqrt(35) + 10 + sqrt(35) - unfilledTimelineHeight = 142 - sqrt(35) - unfilledTimelineHeight`.
      Note that we don't render any unfilled portion if `phase >= 3` because
      this means the puzzle is over. */}
      {phase < 3 ? (
        <rect
          className="fill-gray-350"
          width={2}
          height={unfilledTimelineHeight}
          x={5}
          y={142 - Math.sqrt(35) - unfilledTimelineHeight}
        />
      ) : null}
      <circle className="fill-tw-green" cx={6} cy={10} r={6} />
      <circle className={phase > 0 ? 'fill-tw-yellow' : 'fill-gray-350'} cx={6} cy={54} r={6} />
      <circle className={phase > 1 ? 'fill-tw-orange' : 'fill-gray-350'} cx={6} cy={98} r={6} />
      <circle className={phase > 2 ? 'fill-tw-red' : 'fill-gray-350'} cx={6} cy={142} r={6} />
    </svg>
  );
};

export default PuzzleInfoTimeLeftTimeline;
