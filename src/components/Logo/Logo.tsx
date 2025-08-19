'use client';

import type { SVGProps } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@heroui/react';
import { NoSsr } from '../NoSsr';

type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function ThemeLogo({ size = 24, width, height, ...props }: IconSvgProps) {
  const { theme } = useTheme();
  return (
    <svg
      viewBox="0 0 48 48"
      height={size || height}
      width={size || width}
      {...props}
    >
      <path
        d="m5.6 4 24.3-1.8c3-.3 3.7-.1 5.6 1.3l7.8 5.4c1.3.9 1.7 1.2 1.7 2.2V41c0 1.9-.7 3-3.1 3.1l-28.2 1.7c-1.8.1-2.6-.2-3.6-1.4L4.4 37c-1-1.4-1.4-2.4-1.4-3.6V7c0-1.6.7-2.8 2.6-3zm6.1 11.4v25.4c0 1.4.7 1.9 2.2 1.8L40.4 41c1.5-.1 1.7-1 1.7-2.1V13.7c0-1.1-.4-1.7-1.4-1.6L13 13.7c-1 .1-1.3.6-1.3 1.7zm-1.5-5.6c1.4 1.1 1.9 1 4.4.9l24.1-1.4c.5 0 .1-.5-.1-.6l-4-2.9c-.8-.6-1.8-1.3-3.7-1.1L7.6 6.3c-.9.1-1 .5-.7.9l3.3 2.6z"
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        }}
        className={cn(theme === 'dark' ? 'fill-white' : 'fill-black')}
      />
      <path
        d="m29.2 17.5-4.1.2 4.1-.2zM37.5 35.9c-.4 0-.8-.1-1-.1-.3-.1-.5-.1-.6-.2l-.3-.3c0-.1-.1-.3-.1-.5l-.2-15v-.5c0-.1.1-.2.2-.4.1-.1.3-.2.6-.3.3-.1.6-.2 1-.2.2-.1.3-.2.3-.5v-.3c0-.1 0-.2-.1-.3l-8.2.4c0 .1-.1.2-.1.3v.3c0 .3.1.4.3.5.4 0 .8.1 1 .1.3.1.5.1.6.2l.3.3c0 .1.1.3.1.5l.1 5.4-8.5.5v-6c0-.1.1-.3.3-.4.1-.1.3-.2.6-.3.3-.1.6-.2 1.1-.2.2-.1.3-.2.3-.5v-.3c0-.1 0-.2-.1-.3l-8.5.4c0 .1-.1.2-.1.3v.3c0 .3.1.4.3.5.5 0 .8.1 1.1.1.3.1.5.1.6.2l.3.3c0 .1.1.3.1.5l.1 15.3c0 .2 0 .4-.1.5 0 .1-.1.3-.3.4-.1.1-.3.2-.6.3-.3.1-.6.2-1.1.3-.2 0-.3.2-.3.6v.3c0 .1 0 .2.1.3l8.6-.5v-.7c0-.3-.1-.5-.3-.5-.4 0-.8-.1-1.1-.1-.3-.1-.5-.1-.6-.2l-.3-.3c0-.1-.1-.3-.1-.5v-6.2l8.6-.5.1 6.2c0 .2 0 .4-.1.5 0 .1-.1.3-.2.4-.1.1-.3.2-.6.3-.3.1-.6.2-1.1.3-.2 0-.3.2-.3.5v.3c0 .1 0 .2.1.3l8.4-.5v-.7c0-.4-.1-.6-.3-.6z"
        className={cn(theme === 'dark' ? 'fill-white' : 'fill-black')}
      />
    </svg>
  );
}

export const Logo = ({ size = 24, width, height, ...props }: IconSvgProps) => {
  return (
    <NoSsr>
      <ThemeLogo size={size} width={width} height={height} {...props} />
    </NoSsr>
  );
};
