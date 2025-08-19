import type { Metadata } from 'next/types';
import { genPageMetadata } from '@/config/genPageMetadata';
import { ResetPasswordView } from '../ResetPasswordView';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = await props.params;
  return genPageMetadata({
    params: { locale },
    title: 'Reset your password',
    description: 'Reset your password',
  });
}

export default async function ResetPasswordPage(
  props: PageProps<{ token: string }>
) {
  const { token } = await props.params;
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <ResetPasswordView token={token} />
    </div>
  );
}
