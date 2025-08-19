import type { Metadata } from 'next';
import { genPageMetadata } from '@/config/genPageMetadata';
import { Logout } from './Logout';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = await props.params;
  return genPageMetadata({
    params: { locale },
    title: 'Logout',
    description: 'Logout',
  });
}

export default function LogoutPage() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <Logout />
    </div>
  );
}
