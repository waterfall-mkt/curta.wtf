'use client';

import { useState } from 'react';

import type { GolfCourseValue } from './types';

import LogoIcon from '@/components/common/logo-icon';
import { CodeBlock } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseProblemDisplayProps = {
  course: GolfCourseValue;
  languages: string[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseProblemDisplay: React.FC<CourseProblemDisplayProps> = ({ course, languages }) => {
  const [language, setLanguage] = useState<string>(() =>
    course.solidity ? 'Solidity' : course.huff ? 'Huff' : 'Bytecode',
  );

  const props = {
    className: 'min-h-[8.75rem] grow w-full',
    style: { maxHeight: '38.5rem' },
    fileName: 'Course',
    switcher: {
      options: languages,
      value: language,
      onChange: (value: string) => setLanguage(value),
    },
  };

  if (course.solidity && language === 'Solidity') {
    return (
      <CodeBlock language="solidity" {...props}>
        {course.solidity}
      </CodeBlock>
    );
  }

  if (course.huff && language === 'Huff') {
    return (
      <CodeBlock language="cpp" logo={LogoIcon.Huff} {...props}>
        {course.huff}
      </CodeBlock>
    );
  }

  return (
    <CodeBlock language="none" showLineNumbers={false} breakLines {...props}>
      {course.bytecode ?? '0x'}
    </CodeBlock>
  );
};

export default CourseProblemDisplay;
