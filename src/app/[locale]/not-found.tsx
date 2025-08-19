import { Error404 } from '@/views/Error/Error404';

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.
export default function NotFoundPage() {
  return <Error404 />;
}
