'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { graphql } from '@/common/graphql';
import { useRouter } from '@/hooks/useRouter';
import { useMutation } from '@apollo/client';
import { addToast, Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';

export const VERIFY_CUSTOMER_ACCOUNT = graphql(`
  mutation verifyCustomerAccount($password: String, $token: String!) {
    verifyCustomerAccount(password: $password, token: $token) {
      __typename
      ... on CurrentUser {
        identifier
      }
      ... on MissingPasswordError {
        message
        errorCode
      }
      ... on PasswordValidationError {
        message
        errorCode
      }
      ... on VerificationTokenInvalidError {
        message
        errorCode
      }
      ... on VerificationTokenExpiredError {
        message
        errorCode
      }
    }
  }
`);

export const EmailVerificationForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const resetPwdSchema = z.object({
    password: z
      .string()
      .min(8, 'The password must be at least 8 character(s).'),
  });
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [verifyCustomerAccount, { loading }] = useMutation(
    VERIFY_CUSTOMER_ACCOUNT
  );

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof resetPwdSchema>
  >({
    resolver: zodResolver(resetPwdSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: z.infer<typeof resetPwdSchema>) => {
    const result = await verifyCustomerAccount({
      variables: {
        password: data.password,
        token: token,
      },
    });
    if (result.data?.verifyCustomerAccount.__typename === 'CurrentUser') {
      addToast({
        title: 'Email verified successfully',
        color: 'success',
      });
      router.push('/login');
    } else if (
      result.data?.verifyCustomerAccount.__typename ===
        'VerificationTokenInvalidError' ||
      result.data?.verifyCustomerAccount.__typename ===
        'VerificationTokenExpiredError'
    ) {
      addToast({
        title: 'Invalid verification token',
        color: 'danger',
      });
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="text-center font-semibold">Verify your email</h2>
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 space-y-10"
      >
        <Input
          label="Password"
          fullWidth
          labelPlacement="outside"
          type={isVisible ? 'text' : 'password'}
          placeholder="Enter password"
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
          {...register('password')}
          isInvalid={!!formState.errors.password}
          errorMessage={formState.errors.password?.message}
        />
        <Button
          fullWidth
          color="primary"
          type="submit"
          isLoading={loading}
          isDisabled={!isVisible}
        >
          Verify
        </Button>
      </form>
    </div>
  );
};
