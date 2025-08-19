import type { Metadata } from 'next';
import { genPageMetadata } from '@/config/genPageMetadata';
import { PassportPage } from '@/views/Passport';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = await props.params;
  return genPageMetadata({
    params: { locale },
    title: 'Login',
    description: 'Login',
  });
}

export default function LoginPage() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <PassportPage defaultTab="login" />
    </div>
  );
}
