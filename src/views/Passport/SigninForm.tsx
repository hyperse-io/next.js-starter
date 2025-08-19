'use client';

import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { graphql } from '@/common/graphql';
import { useMutation } from '@apollo/client';
import { addToast, Button, Checkbox, Input, Link } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { usePassport } from './PassportModal';
import { SocialLogin } from './SocialLogin';
// import { SocialLogin } from './SocialLogin';

const EMAIL_PASSWORD_AUTHENTICATE = graphql(`
  mutation Login($email: String!, $password: String!, $rememberMe: Boolean) {
    login(username: $email, password: $password, rememberMe: $rememberMe) {
      __typename
      ... on CurrentUser {
        id
        identifier
      }
      ... on InvalidCredentialsError {
        errorCode
        message
        authenticationError
      }
      ... on NotVerifiedError {
        message
        errorCode
      }
      ... on NativeAuthStrategyError {
        message
        errorCode
      }
    }
  }
`);

interface SigninFormProps {
  /**
   * If true, the title will be short
   */
  shortTitle?: boolean;
  /**
   * If pass login success, we will call this callback function,
   * otherwise, we will redirect to the callbackUrl
   */
  onLoginSuccess?: () => void;
}

export const SigninForm: FC<SigninFormProps> = ({
  shortTitle,
  onLoginSuccess,
}) => {
  const loginSchema = z.object({
    username: z.email('The email address is required.'),
    password: z.string().min(1, 'The password is required.'),
    rememberMe: z.boolean(),
  });
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { refreshActiveUser } = usePassport();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof loginSchema>
  >({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  const [loginMutation, { loading }] = useMutation(
    EMAIL_PASSWORD_AUTHENTICATE,
    {}
  );

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const result = await loginMutation({
      variables: {
        email: data.username,
        password: data.password,
        rememberMe: data.rememberMe,
      },
    });
    if (result!.data?.login.__typename === 'CurrentUser') {
      refreshActiveUser();
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        window.location.href = callbackUrl;
      }
    } else {
      if (
        result.data?.login.__typename === 'InvalidCredentialsError' ||
        result.data?.login.__typename === 'NotVerifiedError' ||
        result.data?.login.__typename === 'NativeAuthStrategyError'
      ) {
        addToast({
          title: result.data?.login.message,
          color: 'danger',
        });
      } else {
        addToast({
          title: 'An error occurred.',
          color: 'danger',
        });
      }
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-2 pt-6 pb-10">
        <p className="pb-4 text-left text-3xl font-semibold">
          {shortTitle ? 'Log in' : 'Sign in with email'}
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <form
          method="post"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            isRequired
            labelPlacement="outside"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            {...register('username')}
            autoComplete="off"
            isInvalid={!!formState.errors.username}
            errorMessage={formState.errors.username?.message}
          />
          <Input
            isRequired
            endContent={
              <button
                type="button"
                onClick={toggleVisibility}
                className="cursor-pointer"
              >
                {isVisible ? (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            labelPlacement="outside"
            placeholder="Enter your password"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
            {...register('password')}
            isInvalid={!!formState.errors.password}
            errorMessage={formState.errors.password?.message}
          />

          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox defaultSelected size="sm" {...register('rememberMe')}>
              Remember me
            </Checkbox>
            <Link
              className="text-default-500"
              href="/forgot-password"
              size="sm"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            className="w-full"
            color="primary"
            type="submit"
            isLoading={loading}
          >
            Sign In
          </Button>
          <SocialLogin />
          <p className="text-small text-center">
            Need to create an account?&nbsp;
            <Link href="/register" size="sm">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
