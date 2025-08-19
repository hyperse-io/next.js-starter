'use client';

import type { TreeNode } from '@dimjs/utils';
import { Accordion, AccordionItem, Link } from '@heroui/react';
import { Icon } from '@iconify/react';

export type BlockCollectionItem = {
  id: string;
  name: string;
  slug: string;
};

interface BlockCollectionItemProps {
  level?: number;
  catalogTree: TreeNode<BlockCollectionItem, 'children'>;
}

export const BlockCollectionItem = (props: BlockCollectionItemProps) => {
  const { level = 0, catalogTree } = props;
  if (catalogTree.children.length === 0) {
    return (
      <div className="my-2 px-2">
        <Link href={`/category/${catalogTree.slug}`} className="block">
          <div className="text-sm">{catalogTree.name}</div>
        </Link>
      </div>
    );
  }

  return (
    <Accordion fullWidth selectionMode="multiple">
      <AccordionItem
        indicator={<Icon icon="solar:alt-arrow-down-linear" width={24} />}
        title={
          catalogTree.children.length > 0 ? (
            <div className="flex items-center text-base">
              {catalogTree.name}
            </div>
          ) : (
            <Link
              key={catalogTree.id}
              href={`/category/${catalogTree.slug}`}
              className="block"
            >
              <div className="text-base">{catalogTree.name}</div>
            </Link>
          )
        }
      >
        <div className="space-y-2">
          {catalogTree.children.map((child) => {
            const children = child.children || [];
            if (children.length > 0) {
              return (
                <BlockCollectionItem
                  key={child.id}
                  catalogTree={child}
                  level={level + 1}
                />
              );
            }
            if (level === 0) {
              return (
                <Link
                  key={child.id}
                  data-level={level}
                  href={`/category/${child.slug}`}
                  className="block"
                >
                  <div className="text-sm">{child.name}</div>
                </Link>
              );
            }
            return (
              <Link
                key={child.id}
                href={`/category/${child.slug}`}
                data-level={level}
                className="block"
              >
                <div className="text-sm">{child.name}</div>
              </Link>
            );
          })}
        </div>
      </AccordionItem>
    </Accordion>
  );
};
