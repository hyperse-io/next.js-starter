import type { FC } from 'react';
import { cn, Spinner } from '@heroui/react';

type LoadingBoxProps = {
  loadingTxt?: string;
  className?: string;
};

export const LoadingBox: FC<LoadingBoxProps> = ({
  loadingTxt,
  className,
  ...props
}) => {
  return (
    <div className={cn('mx-auto text-center', className)} {...props}>
      <Spinner variant="dots" color="primary" />
      {loadingTxt ? <div className="text-sm">{loadingTxt}</div> : null}
    </div>
  );
};
