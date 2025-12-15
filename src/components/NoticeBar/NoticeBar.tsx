import { Link } from '@heroui/link';

export type NoticeBarProps = {
  item: { title: string; href: string; terms: string[] };
};

export const noticebarHeight = 40;

export const NoticeBar = ({ item }: NoticeBarProps) => {
  return (
    <div className="border-b-1 border-divider bg-gradient-to-r from-pink-200 via-purple-300 to-blue-300 dark:from-pink-900 dark:via-purple-900 dark:to-blue-900">
      <div className="mx-auto flex w-full max-w-8xl items-center justify-center gap-x-3 px-6 py-2 sm:px-3.5">
        <Link
          href={item.href}
          className="text-sm text-foreground/80 hover:text-foreground"
          underline="hover"
        >
          {item?.title}
        </Link>
      </div>
    </div>
  );
};
