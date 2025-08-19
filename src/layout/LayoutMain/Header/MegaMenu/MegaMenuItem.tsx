'use client';

import { useState } from 'react';
import { usePathname } from '@/i18n/routing';
import { isPathMatchRoute } from '@/utils/isPathMatchRoute';
import type { TreeNode } from '@dimjs/utils';
import { cn, Link, Tooltip } from '@heroui/react';

export type MegaMenuItem = {
  id: string;
  name: string;
  slug: string;
};

type MegaMenuItemProps = {
  collectionItem: TreeNode<MegaMenuItem, 'children'>;
};

const reArrangeMenuItems = (
  catalog: TreeNode<MegaMenuItem, 'children'>
): TreeNode<MegaMenuItem, 'children'>[] => {
  const children = catalog.children || [];
  const childItems: TreeNode<MegaMenuItem, 'children'>[] = [];
  const noNextLevelItems: TreeNode<MegaMenuItem, 'children'>[] = [];
  children.forEach((s) => {
    if (s.children.length) {
      childItems.push(s);
    } else {
      noNextLevelItems.push(s);
    }
  });
  // No sub items and no next level items, return empty array
  if (childItems.length === 0 && noNextLevelItems.length === 0) {
    return [];
  }

  // has sub items
  if (childItems.length > 0) {
    return childItems.concat(noNextLevelItems.length ? noNextLevelItems : []);
  }

  return [
    {
      id: '-1',
      name: catalog.name,
      slug: catalog.slug,
      children: noNextLevelItems,
    },
  ];
};

const categorySlug = (slug: string) => `/category/${slug}`;

export function MegaMenuItem({ collectionItem }: MegaMenuItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const newChildren = reArrangeMenuItems(collectionItem!);
  const onlyTopLevelItem = newChildren.length === 0;

  const topLinkItem = (
    <Link
      href={categorySlug(collectionItem.slug)}
      className={cn('text-foreground/80 py-2', {
        'text-foreground': isOpen,
      })}
    >
      {collectionItem.name}
    </Link>
  );

  return (
    <div className="ml-1.5 flex items-center">
      {onlyTopLevelItem ? (
        topLinkItem
      ) : (
        <Tooltip
          onOpenChange={(open) => {
            setIsOpen(open);
          }}
          placement="bottom-start"
          content={
            <div className="mx-1 flex">
              {newChildren.map((s) => {
                const children: TreeNode<MegaMenuItem, 'children'>[] =
                  s.children || [];
                const showHeading = s.id !== '-1';
                const slugHref = categorySlug(s.slug);
                return (
                  <div key={s.id} className="mx-4">
                    {showHeading ? (
                      <div
                        key={s.id}
                        className={cn('mb-2 border-b py-2 text-base', {
                          'border-foreground-500': showHeading,
                        })}
                      >
                        <Link href={slugHref} className="text-foreground-600">
                          {s.name}
                        </Link>
                      </div>
                    ) : null}
                    {children.map((s) => {
                      const slugHref = categorySlug(s.slug);
                      const isActive = isPathMatchRoute(pathname, slugHref);
                      return (
                        <div key={s.id}>
                          <Link
                            href={slugHref}
                            underline="hover"
                            className={cn('text-foreground-700 py-2 text-sm', {
                              'text-foreground': isActive,
                            })}
                          >
                            {s.name}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          }
        >
          {topLinkItem}
        </Tooltip>
      )}
    </div>
  );
}
