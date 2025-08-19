import type { FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { graphql } from '@/common/graphql';
import { useMutation } from '@apollo/client';
import { addToast, Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react/dist/iconify.js';

const RESET_PASSWORD = graphql(`
  mutation ResetPassword($password: String!, $token: String!) {
    resetPassword(password: $password, token: $token) {
      __typename
      ... on CurrentUser {
        id
      }
      ... on NotVerifiedError {
        message
        errorCode
      }
      ... on NativeAuthStrategyError {
        message
        errorCode
      }
      ... on PasswordResetTokenExpiredError {
        message
        errorCode
      }
      ... on PasswordResetTokenInvalidError {
        message
        errorCode
      }
      ... on PasswordValidationError {
        message
        errorCode
      }
    }
  }
`);
type ResetPasswordProps = {
  token: string;
  onResetSuccess?: () => void;
  onResetLinkExpired?: () => void;
};

export const ResetPassword: FC<ResetPasswordProps> = ({
  token,
  onResetSuccess,
  onResetLinkExpired,
}) => {
  const resetPwdSchema = z
    .object({
      password: z
        .string()
        .min(8, 'The password must be at least 8 character(s).'),
      confirmPassword: z
        .string()
        .min(8, 'The password must be at least 8 character(s).'),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'The passwords did not match',
          path: ['confirmPassword'],
        });
      }
    });
  const [showPassword, setShowPassword] = useState(true);

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof resetPwdSchema>
  >({
    resolver: zodResolver(resetPwdSchema),
    defaultValues: {},
  });

  const [resetPwdMutation] = useMutation(RESET_PASSWORD, {});
  const onSubmit = async (data: z.infer<typeof resetPwdSchema>) => {
    const result = await resetPwdMutation({
      variables: {
        password: data.password,
        token: token,
      },
    });

    if (result.data?.resetPassword.__typename === 'CurrentUser') {
      if (onResetSuccess) {
        onResetSuccess();
      } else {
        window.location.href = '/';
      }
    } else {
      if (
        result.data?.resetPassword.__typename ===
          'PasswordResetTokenExpiredError' &&
        onResetLinkExpired
      ) {
        onResetLinkExpired();
      } else {
        addToast({
          title: result.data?.resetPassword.message ?? 'An error occurred.',
          color: 'danger',
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-10">
        <div className="flex flex-col items-center gap-2">
          <Icon icon="solar:lock-linear" width="24" height="24" />
          <h2 className="text-center font-bold">Reset Password</h2>
          <p className="text-center">Please choose your new password</p>
        </div>
      </div>
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-10"
      >
        <Input
          label="Password"
          variant="bordered"
          labelPlacement="outside"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          endContent={
            <button
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="cursor-pointer"
            >
              {showPassword ? (
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
        <Input
          label="Confirm Password"
          variant="bordered"
          labelPlacement="outside"
          fullWidth
          type="password"
          placeholder="Enter confirm password"
          {...register('confirmPassword')}
          isInvalid={!!formState.errors.confirmPassword}
          errorMessage={formState.errors.confirmPassword?.message}
        />
        <Button
          fullWidth
          color="primary"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};
