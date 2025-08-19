import type { Metadata } from 'next/types';
import { genPageMetadata } from '@/config/genPageMetadata';
import { EmailVerificationView } from '../EmailVerificationView';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = await props.params;
  return genPageMetadata({
    params: { locale },
    title: 'Email Verification',
    description: 'Email Verification',
  });
}

export default async function EmailVerificationPage(
  props: PageProps<{ token: string }>
) {
  const { token } = await props.params;
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <EmailVerificationView token={token} />
    </div>
  );
}
