'use client';

import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiCheck } from 'react-icons/hi';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useEventCallback } from 'usehooks-ts';
import z from 'zod';
import { Link } from '@/navigation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form';
import { Input } from '@/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/ui/input-otp';
import { toast } from '@/ui/use-toast';
import { useLazyQuery, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { authenticate, requestOneTimeCode } from './data';

const loginSchema = z.object({
  username: z
    .string({
      message: 'The email address is required.',
    })
    .email({
      message: 'The email address is invalid',
    }),
  code: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

type LoginInput = z.infer<typeof loginSchema>;

type LoginFormProps = {
  /**
   * If we need to show footer links, in Modal we don't need to show it.
   * @default true
   */
  showFooterLinks?: boolean;
  /**
   * If provider onLogin callback it, it not redirect to the callbackUrl
   * @returns
   */
  onLoginDone?: () => void;
};

export const LoginForm: FC<LoginFormProps> = ({
  onLoginDone,
  showFooterLinks = true,
}) => {
  const t = useTranslations('Login');
  const [error, setError] = useState<string>();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  const [execOtpQuery, otpResult] = useLazyQuery(requestOneTimeCode, {});
  const [loginMutation, loginResult] = useMutation(authenticate, {});

  const handleOtpCode = useEventCallback(async () => {
    await form.trigger('username');
    const username = form.getValues('username');

    if (!username) {
      return;
    }

    const result = await execOtpQuery({
      variables: {
        email: username,
      },
    });

    if (result!.data?.requestOneTimeCode.__typename === 'OneTimeCode') {
      toast({
        title: 'You submitted the following values:',
        description: JSON.stringify(result.data?.requestOneTimeCode.value),
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'The error occurs',
        description: result.error?.message,
      });
    }
  });

  const onSubmit = useEventCallback(async (data: LoginInput) => {
    if (error) setError(undefined);
    const result = await loginMutation({
      variables: {
        email: data.username,
        code: data.code,
        rememberMe: true,
      },
    });
    if (result!.data?.authenticate.__typename === 'CurrentUser') {
      if (onLoginDone) {
        onLoginDone();
      } else {
        window.location.href = callbackUrl;
      }
    } else {
      if (result.data?.authenticate.__typename === 'InvalidCredentialsError') {
        setError(result.data?.authenticate.message);
      }
    }
  });

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel> {t('email')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <div className="items-center justify-between md:flex">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      {...field}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <LoadingButton
                    type="button"
                    size="medium"
                    loading={otpResult.loading}
                    variant="outlined"
                    className="mt-2 rounded-md px-3 font-semibold md:mt-0"
                    onClick={() => {
                      handleOtpCode();
                    }}
                  >
                    {otpResult.data?.requestOneTimeCode.__typename ===
                    'OneTimeCode' ? (
                      <>
                        <HiCheck className="mr-1" />
                        {t('sent')}
                      </>
                    ) : (
                      t('send')
                    )}
                  </LoadingButton>
                </div>
                <FormDescription>
                  Please enter the one-time password sent to your mailbox.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <LoadingButton
            loading={loginResult.loading}
            fullWidth
            type="submit"
            size="large"
            variant="contained"
            className="w-full rounded-md bg-[#357D8A] px-3 font-semibold text-white"
          >
            {t('submit')}
          </LoadingButton>
        </div>
        {showFooterLinks ? (
          <p className="text-left text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/terms"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            .
          </p>
        ) : null}
        {error && <p className="text-red-700">{t('error', { error })}</p>}
      </form>
    </Form>
  );
};
