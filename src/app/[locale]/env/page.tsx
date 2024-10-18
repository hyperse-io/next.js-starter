import { Metadata } from 'next';
import { LoginForm } from '@/components/Auth/LoginForm';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { genPageMetadata } from '@/config/seo';
import Logo from '@/data/logo.svg';

export const metadata: Metadata = genPageMetadata({
  title: 'Login',
  description: 'The customer login',
});

export const generateStaticParams = async () => {
  return [
    { locale: 'en', slug: 'test1' },
    { locale: 'zh', slug: 'test1' },
    { locale: 'en', slug: 'test2' },
    { locale: 'zh', slug: 'test2' },
  ];
};

export default function Login() {
  return (
    <LayoutWrapper>
      <div className="mx-auto flex min-h-full flex-1 flex-col justify-center bg-white px-6 py-20 dark:bg-slate-900 lg:px-4">
        <div className="flex w-full flex-col gap-4 rounded-xl px-4 pb-10 pt-6 backdrop-blur-md backdrop-saturate-150 bg-slate-200 dark:bg-transparent dark:bg-hyperse-gradient sm:mx-auto sm:w-full sm:max-w-lg sm:px-8">
          <div className="sm:mx-auto sm:w-full">
            <Logo height={40} width={40} className="fill-transparent" alt="" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
              Sign in to your account
            </h2>
          </div>
          <div className="rounded-large shadow-small dark:bg-default-100/50 mt-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
