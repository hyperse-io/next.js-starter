import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  cn,
  Link,
  ScrollShadow,
} from '@heroui/react';

const helpLinks = [
  {
    name: 'How to use Vercel',
    link: '/help/article/how-to-use-vercel',
  },
  {
    name: 'How to use Vercel',
    link: '/help/article/how-to-use-vercel',
  },
  {
    name: 'How to use Vercel',
    link: '/help/article/how-to-use-vercel',
  },
  {
    name: 'How to use Vercel',
    link: '/help/article/how-to-use-vercel',
  },
  {
    name: 'How to use Vercel',
    link: '/help/article/how-to-use-vercel',
  },
  {
    name: 'How to use Vercel',
    link: '/help/article/how-to-use-vercel',
  },
];

export function HelpLinks() {
  return (
    <Card className="w-full max-w-[420px]">
      <CardHeader className="flex flex-col px-0 pb-0">
        <div className="flex w-full items-center justify-between px-5 py-2">
          <div className="inline-flex items-center gap-1">
            <h4 className="text-large inline-block align-middle font-medium">
              Help & FAQ
            </h4>
          </div>
        </div>
      </CardHeader>
      <CardBody className="w-full gap-0 p-0">
        <ScrollShadow className={cn('max-h-[400px] min-h-[200px] w-full', {})}>
          {helpLinks.map((link) => (
            <div
              key={link.link}
              className={cn(
                'border-divider/80 flex min-w-[300px] gap-3 border-b px-6 py-2'
              )}
            >
              <Link
                href={link.link}
                className="text-small text-foreground/80 hover:text-foreground"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </ScrollShadow>
      </CardBody>
      <CardFooter className="justify-end gap-2 px-4">
        <Button fullWidth as={Link} variant="solid" href="/help">
          Help & FAQ
        </Button>
      </CardFooter>
    </Card>
  );
}
