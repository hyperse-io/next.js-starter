import { arrayToTree } from '@dimjs/utils';
import { NavbarItem } from '@heroui/react';
import { MegaMenuItem } from './MegaMenuItem';

export type MegaMenuProps = {
  collections: Array<MegaMenuItem>;
};

export const MegaMenu = ({ collections }: MegaMenuProps) => {
  const treeRoot = arrayToTree<MegaMenuItem, 'children'>(collections);
  return (
    <>
      {treeRoot.children.map((collection) => (
        <NavbarItem key={collection.id}>
          <MegaMenuItem collectionItem={collection} />
        </NavbarItem>
      ))}
    </>
  );
};
