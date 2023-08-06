import type { FC, ReactNode } from 'react';

/* Props */
type ContainerLayoutProps = {
  children: ReactNode;
};

/* Component */
const ContainerLayout: FC<ContainerLayoutProps> = ({ children }) => (
  <div className="relative mx-auto flex w-full max-w-[90rem] grow flex-col overflow-hidden px-4 pb-6 pt-4 lg:px-20 lg:pb-16 lg:pt-12">
    {children}
  </div>
);

export default ContainerLayout;
