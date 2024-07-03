'use client';

import { type FC, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import PopupState, {
  bindHover,
  bindPopover,
  bindToggle,
} from 'material-ui-popup-state';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import { useBreakPoints } from '@/hooks/useBreakPoints';
import { cn } from '@/utils/cn';
import { usePathname, useRouter } from '../../navigation';
import { IconLang } from './IconLang';

type LocaleSwitcherProps = {
  // hover?: boolean;
};
export const LocaleSwitcher: FC<LocaleSwitcherProps> = () => {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('LocaleSwitcher');
  const [, startTransition] = useTransition();
  const isLgScreen = useBreakPoints('lg');

  function onSelectChange(nextLocale: 'en' | 'zh') {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <PopupState variant="popper" popupId="translationMenu">
      {(popupState) => (
        <>
          <button
            className="m-auto flex items-center rounded-full border-2 border-black bg-[#1f2937] px-2 py-1 font-extralight text-white transition duration-300 hover:scale-[105%] active:scale-[95%] dark:border-zinc-200 dark:bg-transparent"
            {...(isLgScreen ? bindHover : bindToggle)(popupState)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
              ></path>
            </svg>
            {/* <span className="text-base font-bold">
              {t('locale', { locale })}
            </span> */}
            <svg
              className="mx-1 size-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <HoverPopover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            classes={{
              paper: '!rounded-lg',
            }}
          >
            <div className="rounded-lg border bg-white p-2 shadow-md dark:divide-gray-700 dark:border dark:border-gray-700 dark:bg-gray-800">
              <div className="py-1">
                <button
                  className={cn(
                    'rounded-xl flex items-center px-2 py-1 h-full w-full cursor-pointer hover:bg-gray-100 text-primary dark:hover:bg-gray-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:hover:text-[#75e8ff]',
                    locale === 'en'
                      ? 'bg-gray-100 dark:bg-gray-600 dark:text-[#75e8ff]'
                      : ''
                  )}
                  onClick={() => {
                    onSelectChange('en');
                  }}
                >
                  <IconLang lang="en" className="mr-2" />
                  {t('locale', { locale: 'en' })}
                </button>
              </div>
              <div className="py-1">
                <button
                  className={cn(
                    'rounded-xl flex items-center px-2 py-1 h-full w-full cursor-pointer hover:bg-gray-100 text-primary dark:hover:bg-gray-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:hover:text-[#75e8ff]',
                    locale === 'zh'
                      ? 'bg-gray-100 dark:bg-gray-600 dark:text-[#75e8ff]'
                      : ''
                  )}
                  onClick={() => {
                    onSelectChange('zh');
                  }}
                >
                  <IconLang lang="zh" className="mr-2" />
                  {t('locale', { locale: 'zh' })}
                </button>
              </div>
            </div>
          </HoverPopover>
        </>
      )}
    </PopupState>
  );
};
