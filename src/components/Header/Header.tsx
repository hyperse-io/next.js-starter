'use client';

import { useMediaQuery } from 'usehooks-ts';
import { headerNavLinks } from '@/data/headerNavLinks';
import Logo from '@/data/logo.svg';
import { siteMetadata } from '@/data/siteMetadata';
import { CustomLink } from '../Link/CustomLink';
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher';
import { MobileNav } from '../MobileNav/MobileNav';
import { SectionContainer } from '../SectionContainer';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitch';

export const Header = () => {
  const isMobile = useMediaQuery('(max-width: 767px)', {
    initializeWithValue: false,
  });

  return (
    <header>
      <SectionContainer>
        <div className="flex items-center justify-between py-4 lg:py-10">
          <div>
            <CustomLink href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo height={40} width={40} className="fill-transparent" />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </CustomLink>
          </div>
          <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
            {isMobile ? null : (
              <ul className="flex flex-col items-start justify-center gap-5 md:flex-row md:items-center">
                {headerNavLinks
                  .filter((link) => link.href !== '/')
                  .map((link) => (
                    <li key={link.href}>
                      <CustomLink
                        key={link.title}
                        href={link.href}
                        className="relative pb-1 text-xl after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:duration-300 after:ease-in-out hover:no-underline hover:after:w-full"
                      >
                        {link.title}
                      </CustomLink>
                    </li>
                  ))}
              </ul>
            )}
            <LocaleSwitcher />
            <ThemeSwitcher />
            {isMobile ? <MobileNav /> : null}
          </div>
        </div>
      </SectionContainer>
    </header>
  );
};
