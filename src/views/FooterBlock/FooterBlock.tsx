import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { Logo } from '@/components/Logo';
import type { ExpandableTreeNodeResult } from '@dimjs/utils';
import { arrayToTree } from '@dimjs/utils';
import { LinkBlock } from './LinkBlock';
import { SocialLinks } from './SocialLinks';
import { ThemeSwitch } from './ThemeSwitch';

export type FooterTopicLink = {
  id: string;
  name: string;
  redirectTo: string;
  parentId: string;
};

interface FooterBlockProps {
  footerLinks: Array<FooterTopicLink>;
}

const toLinkTree = (items: Array<FooterTopicLink>) => {
  const linkTree = arrayToTree<FooterTopicLink, 'children'>(
    items.map((s) => {
      return {
        ...s,
        parent: s.parentId
          ? {
              id: s.parentId,
            }
          : null,
      };
    })
  );
  return linkTree.children as ExpandableTreeNodeResult<
    FooterTopicLink,
    'children'
  >[];
};
export function FooterBlock({ footerLinks }: FooterBlockProps) {
  const linkTree = toLinkTree(footerLinks);
  return (
    <footer>
      <div className="max-w-8xl mx-auto px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 md:pr-8">
            <div className="flex items-center justify-start">
              <Logo size={40} />
              <span className="text-medium ml-2 font-medium">Vercel</span>
            </div>
            <p className="text-small text-default-500">
              This is a demo site for Vercel.
            </p>
            <SocialLinks />
          </div>
        </div>
        <div className="mt-10 grid md:grid-cols-2 xl:col-span-2 xl:grid-cols-4">
          {linkTree.map((link) => {
            const items = link.children || [];
            return (
              <LinkBlock
                key={link.id}
                blockTitle={link.name}
                links={items.map((child) => ({
                  id: child!.id,
                  title: child!.name,
                  href: child!.redirectTo,
                }))}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap justify-between gap-2 pt-8">
          <p className="text-small text-default-400">
            &copy; 2025 vercel Inc. All rights reserved.
          </p>
          <div className="flex min-w-[500px] items-center gap-2">
            <ThemeSwitch className="w-[200px]" />
            <LocaleSwitcher className="w-[150px]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
