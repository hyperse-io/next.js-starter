import { HideOnScroll } from '@/components/HideOnScroll';
import { Link } from '@heroui/link';

export type NoticeBarProps = {
  item: { title: string; href: string; terms: string[] };
  onScrollTrigger: (trigger: boolean) => void;
};

export const noticebarHeight = 40;

export const NoticeBar = ({ item, onScrollTrigger }: NoticeBarProps) => {
  return (
    <HideOnScroll onScrollTrigger={onScrollTrigger}>
      <div className="border-divider border-b-1 bg-gradient-to-r from-pink-200 via-purple-300 to-blue-300 dark:from-pink-900 dark:via-purple-900 dark:to-blue-900">
        <div className="max-w-8xl mx-auto flex w-full items-center justify-center gap-x-3 px-6 py-2 sm:px-3.5">
          <Link
            href={item.href}
            className="text-foreground/80 hover:text-foreground text-sm"
            underline="hover"
          >
            {item?.title}
          </Link>
        </div>
      </div>
    </HideOnScroll>
  );
};
