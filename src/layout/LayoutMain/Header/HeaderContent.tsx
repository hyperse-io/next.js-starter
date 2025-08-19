import { useState } from 'react';
import { Logo } from '@/components/Logo';
// import { useMobile } from '@/hooks/useMobile';
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { BlockMobile } from '../SideMenu';
import { HelpCenter } from './HelpCenter';
import type { MegaMenuProps } from './MegaMenu';
import { MegaMenu } from './MegaMenu';
import { Profile } from './Profile';

type HeaderContentProps = {
  noticebarHidden?: boolean;
  collections: MegaMenuProps['collections'];
};

export function HeaderContent({
  collections,
  noticebarHidden,
}: HeaderContentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const isMobile = useMobile();

  return (
    <Navbar
      classNames={{
        item: 'data-[active=true]:text-primary',
        wrapper: 'px-4 sm:px-6 max-w-8xl justify-between',
        toggle: 'sm:hidden',
      }}
      height="60px"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className="flex flex-1 items-center justify-center sm:flex-none">
        {/* Logo */}
        <NavbarBrand className="mx-2 flex items-center gap-2">
          <Link href="/" className="hidden sm:flex">
            <Logo />
            <span className="text-foreground mx-2 font-semibold">Vercel</span>
          </Link>
          {/* <SearchButton simple variant="light" className="sm:hidden" /> */}
          <NavbarMenuToggle
            icon={(isOpen: boolean) => {
              return (
                <Icon
                  icon={
                    isOpen ? 'line-md:close' : 'solar:hamburger-menu-linear'
                  }
                  width="24"
                  height="24"
                />
              );
            }}
          />
        </NavbarBrand>
        {/* PC Menus */}
        <NavbarContent className="hidden gap-4 sm:flex" justify="start">
          <MegaMenu collections={collections} />
        </NavbarContent>
      </div>
      {/* Moibile centered logo */}
      <Link href="/" className="sm:hidden">
        <Logo />
      </Link>
      {/* Right Content */}
      <NavbarContent
        className="ml-auto hidden max-w-fit flex-1 items-center gap-1 md:flex"
        justify="end"
      >
        {/* <SearchButton simple={isMobile} variant={isMobile ? 'light' : 'faded'}>
          Search
        </SearchButton> */}
        <HelpCenter />
        <Profile />
      </NavbarContent>
      {/* Mobile Content */}
      <BlockMobile
        collections={collections}
        noticebarHidden={noticebarHidden}
      />
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarItem>
          <Profile />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
