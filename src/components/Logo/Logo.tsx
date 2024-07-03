import { type FC } from 'react';
import LogoIcon from '@/data/logo.svg';
import { Link } from '@/navigation';
import { cn } from '@/utils';

type LogoProps = {
  showText?: boolean;
  width?: number;
  height?: number;
  className?: string;
};

export const Logo: FC<LogoProps> = ({
  showText = true,
  className = 'fill-white',
  ...restProps
}) => {
  return (
    <Link
      href="/"
      title="Home"
      className="m-0 flex w-fit items-center data/lgap-3 dark:text-white"
    >
      <div className="mr-3">
        <LogoIcon
          height={40}
          width={40}
          className={cn('fill-transparent', className)}
          {...restProps}
        />
      </div>
      {showText ? (
        <span className="text-2xl font-bold text-primary">Hyperse</span>
      ) : (
        <span></span>
      )}
    </Link>
  );
};
