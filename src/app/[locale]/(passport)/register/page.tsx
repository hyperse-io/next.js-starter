import type { Metadata } from 'next';
import { genPageMetadata } from '@/config/genPageMetadata';
import { PassportPage } from '@/views/Passport';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = await props.params;
  return genPageMetadata({
    params: { locale },
    title: 'Create an account',
    description: 'Create an account',
  });
}

export default function RegisterPage() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <PassportPage defaultTab="register" />
    </div>
  );
}
