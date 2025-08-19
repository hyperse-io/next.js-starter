'use client';

import { cn, Skeleton } from '@heroui/react';
import { NoSsr } from '../NoSsr';

type IconSkeletonProps = {
  children: React.ReactNode;
  classNames?: {
    base?: string;
    skeleton?: string;
    content?: string;
  };
};

const baseClass =
  'flex size-6 flex-shrink-0 items-center justify-center rounded-full';

export const IconSkeleton = ({
  children,
  classNames = {},
}: IconSkeletonProps) => {
  const { skeleton = '', content = '', base = '' } = classNames;
  return (
    <NoSsr fallback={<Skeleton className={cn(baseClass, base, skeleton)} />}>
      <div className={cn(baseClass, base, content)}>{children}</div>
    </NoSsr>
  );
};
