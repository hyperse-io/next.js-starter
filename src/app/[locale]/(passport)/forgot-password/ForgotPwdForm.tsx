'use client';

import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { graphql } from '@/common/graphql';
import { useMutation } from '@apollo/client';
import { addToast, Input, Link } from '@heroui/react';
import { Button } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';

const REQUEST_PWD_RESET = graphql(`
  mutation requestPasswordReset($emailAddress: String!) {
    requestPasswordReset(emailAddress: $emailAddress) {
      __typename
      ... on Success {
        success
      }
      ... on NativeAuthStrategyError {
        message
        errorCode
      }
    }
  }
`);

interface ForgotPwdFormProps {
  onSuccess?: (emailAddress: string) => void;
}

export const ForgotPwdForm: FC<ForgotPwdFormProps> = ({ onSuccess }) => {
  const requestPwdResetSchema = z.object({
    emailAddress: z.email('The email address is required.'),
  });

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof requestPwdResetSchema>
  >({
    resolver: zodResolver(requestPwdResetSchema),
    defaultValues: {},
  });

  const [requestPwdResetMutation] = useMutation(REQUEST_PWD_RESET, {});

  const onSubmit = async (data: z.infer<typeof requestPwdResetSchema>) => {
    const result = await requestPwdResetMutation({
      variables: {
        emailAddress: data.emailAddress,
      },
    });
    if (
      result.data?.requestPasswordReset?.__typename === 'Success' &&
      result.data?.requestPasswordReset.success
    ) {
      addToast({
        title: 'Password reset email sent.',
        color: 'success',
      });
      if (onSuccess) {
        onSuccess(data.emailAddress);
      }
    } else {
      addToast({
        title:
          result.data?.requestPasswordReset?.__typename ===
          'NativeAuthStrategyError'
            ? result.data?.requestPasswordReset.message
            : 'An error occurred.',
        color: 'danger',
      });
    }
  };

  return (
    <>
      <div className="mt-5 flex flex-col items-center gap-2">
        <Icon icon="solar:lock-keyhole-linear" width="40" height="40" />
        <h4 className="text-center font-semibold">Forgot your password?</h4>
        <p className="text-center">
          Enter your email address and we&apos;ll send you a link to create a
          new one.
        </p>
      </div>
      <form method="post" onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <div className="space-y-4">
          <Input
            fullWidth
            labelPlacement="outside"
            placeholder="Enter email address"
            {...register('emailAddress')}
            isInvalid={!!formState.errors.emailAddress}
            errorMessage={formState.errors.emailAddress?.message}
          />
          <Button
            fullWidth
            type="submit"
            color="primary"
            isLoading={formState.isSubmitting}
          >
            Submit
          </Button>
        </div>
        <div className="py-2 text-center">
          <p className="text-sm">
            If you continue to have trouble logging in, please let us know by
            emailing{' '}
            <Link target="_blank" href="mailto:service@issilo.com">
              service@issilo.com
            </Link>
            .
          </p>
        </div>
      </form>
    </>
  );
};
