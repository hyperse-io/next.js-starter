import { type FC } from 'react';
import { twMerge } from 'tailwind-merge';

type IconLangProps = {
  lang: 'zh' | 'en';
  className?: string;
};
export const IconLang: FC<IconLangProps> = ({ lang, className }) => {
  return (
    <div
      className={twMerge('h-5 w-5 bg-cover', className)}
      style={{
        backgroundImage: `url(https://unpkg.com/language-icons@0.2.0/icons/${lang}.svg)`,
      }}
    />
  );
};
