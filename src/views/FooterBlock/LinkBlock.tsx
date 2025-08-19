'use client';

import { useState } from 'react';
import { useMobile } from '@/hooks/useMobile';
import { Link } from '@heroui/link';
import { Accordion, AccordionItem } from '@heroui/react';

interface Props {
  blockTitle: string;
  links: Array<{
    id: string;
    title: string;
    href: string;
  }>;
}

export const LinkBlock = ({ blockTitle, links }: Props) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['1']));
  const isMobile = useMobile();
  return (
    <Accordion
      selectedKeys={isMobile ? selectedKeys : ['1']}
      onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
    >
      <AccordionItem
        key={1}
        title={blockTitle}
        classNames={{
          content: 'py-1',
        }}
      >
        <ul className="mt-0 space-y-2">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                className="text-default-500 text-sm"
                underline="hover"
                href={link.href}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </AccordionItem>
    </Accordion>
  );
};
