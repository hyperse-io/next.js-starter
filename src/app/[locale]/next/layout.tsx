'use client';

import { usePathname } from 'next/navigation';
import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const breadcrumbs = pathname.split('/').filter(Boolean);
  const lastBreadcrumb = breadcrumbs.pop();

  return (
    <div className="mx-auto max-w-7xl">
      <nav className="w-full text-start md:pt-4 md:pb-4">
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>{lastBreadcrumb}</BreadcrumbItem>
        </Breadcrumbs>
      </nav>
      {children}
    </div>
  );
}
