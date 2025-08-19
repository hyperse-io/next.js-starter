import { cn, NavbarMenu, ScrollShadow } from '@heroui/react';
import type { BlockCollectionProps } from './BlockCollection';
import { BlockCollection } from './BlockCollection';
import { BlockUser } from './BlockUser';

type BlockMobileProps = {
  collections: BlockCollectionProps['collections'];
  noticebarHidden?: boolean;
};

export function BlockMobile({
  collections,
  noticebarHidden,
}: BlockMobileProps) {
  return (
    <NavbarMenu
      className={cn('h-full', {
        'pt-12': !noticebarHidden,
      })}
    >
      <ScrollShadow orientation="vertical">
        <BlockUser />
        <BlockCollection collections={collections} />
      </ScrollShadow>
    </NavbarMenu>
  );
}
