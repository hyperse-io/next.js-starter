import type { Metadata } from 'next';
import { genPageMetadata } from '@/config/genPageMetadata';
import { ForgotPwdView } from './ForgotPwdView';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = await props.params;
  return genPageMetadata({
    params: { locale },
    title: 'Forgot your password? We can help!',
    description: 'Forgot your password? We can help!',
  });
}

export default function ForgetPasswordPage() {
  return (
    <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
      <ForgotPwdView />
    </div>
  );
}
