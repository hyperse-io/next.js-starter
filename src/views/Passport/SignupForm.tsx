'use client';
import { type FC, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { z } from 'zod';
import { graphql } from '@/common/graphql';
import { IconSkeleton } from '@/components/IconSkeleton';
import { useMutation } from '@apollo/client/react';
import {
  addToast,
  Button,
  Checkbox,
  DateInput,
  Input,
  Link,
  Select,
  SelectItem,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { HeroTelInput } from '@hyperse/hero-tel-input';
import { Icon } from '@iconify/react';
import { CalendarDate, parseDate } from '@internationalized/date';
import { SocialLogin } from './SocialLogin';

const REGISTER_CUSTOMER_ACCOUNT = graphql(`
  mutation RegisterCustomerAccount($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      __typename
      ... on Success {
        success
      }
      ... on PasswordValidationError {
        errorCode
        message
      }
      ... on MissingPasswordError {
        errorCode
        message
      }
      ... on NativeAuthStrategyError {
        errorCode
        message
      }
    }
  }
`);

interface SignupFormProps {
  /**
   * If pass login success, we will call this callback function,
   * otherwise, we will redirect to the callbackUrl
   */
  onLoginSuccess?: () => void;
}
export const SignupForm: FC<SignupFormProps> = ({ onLoginSuccess }) => {
  const signupSchema = z.object({
    title: z.string().min(1, 'The title is required.'),
    firstName: z.string().min(1, 'The first name is required.'),
    lastName: z.string().min(1, 'The last name is required.'),
    email: z.email('The email address is invalid'),
    password: z
      .string()
      .min(8, 'The password must be at least 8 character(s).'),
    phoneNumber: z.string().min(1, 'The phone number is required.'),
    birthday: z.string().min(1, 'The birthday is required.'),
  });
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const locale = useLocale();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const { register, handleSubmit, formState, setValue, control } = useForm<
    z.infer<typeof signupSchema>
  >({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      title: '-',
    },
  });

  const [registerMutation, { loading }] = useMutation(
    REGISTER_CUSTOMER_ACCOUNT,
    {}
  );

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    const result = await registerMutation({
      variables: {
        input: {
          title: data.title,
          firstName: data.firstName,
          lastName: data.lastName,
          emailAddress: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
          customFields: {
            birthday: data.birthday,
            languageCode: locale,
          },
        },
      },
    });

    if (
      result.data?.registerCustomerAccount.__typename === 'Success' &&
      result.data.registerCustomerAccount.success
    ) {
      addToast({
        title: 'Account created successfully',
        color: 'success',
      });
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        window.location.assign(callbackUrl);
      }
    } else {
      addToast({
        title:
          result.data?.registerCustomerAccount?.__typename ===
            'NativeAuthStrategyError' ||
          result.data?.registerCustomerAccount?.__typename ===
            'MissingPasswordError' ||
          result.data?.registerCustomerAccount?.__typename ===
            'PasswordValidationError'
            ? result.data?.registerCustomerAccount.message
            : 'An error occurred.',
        color: 'danger',
      });
    }
  };
  const birthday = useWatch({ control, name: 'birthday' });
  const phoneNumber = useWatch({ control, name: 'phoneNumber' });
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-4 rounded-large px-8 pt-6 pb-10">
        <p className="pb-4 text-left text-3xl font-semibold">
          Sign Up
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Select
            label="Title"
            labelPlacement="outside"
            {...register('title')}
            variant="bordered"
            isInvalid={!!formState.errors.title}
            errorMessage={formState.errors.title?.message}
          >
            <SelectItem key="-">-</SelectItem>
            <SelectItem key={'Mr'}>Mr</SelectItem>
            <SelectItem key={'Miss'}>Miss</SelectItem>
            <SelectItem key={'Mrs'}>Mrs</SelectItem>
            <SelectItem key={'Dr'}>Dr</SelectItem>
          </Select>
          <Input
            isRequired
            label="First Name"
            labelPlacement="outside"
            placeholder="Enter your first name"
            type="text"
            variant="bordered"
            {...register('firstName')}
            isInvalid={!!formState.errors.firstName}
            errorMessage={formState.errors.firstName?.message}
          />
          <Input
            isRequired
            label="Last Name"
            labelPlacement="outside"
            placeholder="Enter your last name"
            type="text"
            variant="bordered"
            {...register('lastName')}
            isInvalid={!!formState.errors.lastName}
            errorMessage={formState.errors.lastName?.message}
          />
          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            {...register('email')}
            isInvalid={!!formState.errors.email}
            errorMessage={formState.errors.email?.message}
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
            {...register('password')}
            isInvalid={!!formState.errors.password}
            errorMessage={formState.errors.password?.message}
          />
          <DateInput
            labelPlacement="outside"
            variant="bordered"
            value={birthday ? parseDate(birthday) : null}
            placeholderValue={new CalendarDate(1995, 11, 6)}
            isInvalid={!!formState.errors.birthday}
            errorMessage={formState.errors.birthday?.message}
            onChange={(newValue) => {
              const value = newValue ? newValue.toString() : '';
              setValue('birthday', value, {
                shouldValidate: true,
              });
            }}
          />
          <HeroTelInput
            fullWidth
            classNames={{
              overlay: 'z-50',
            }}
            variant="bordered"
            placeholder="Enter your phone number"
            isInvalid={!!formState.errors.phoneNumber}
            errorMessage={formState.errors.phoneNumber?.message}
            value={phoneNumber}
            onChange={(newValue) => {
              setValue('phoneNumber', newValue || '', {
                shouldValidate: true,
              });
            }}
            unknownFlagElement={
              <IconSkeleton>
                <Icon
                  icon="line-md:phone-call-loop"
                  className="size-6 text-default-500"
                />
              </IconSkeleton>
            }
          />
          <Checkbox isRequired className="py-4" size="sm">
            I agree with the&nbsp;
            <Link className="relative z-[1]" href="/terms-of-use" size="sm">
              Terms
            </Link>
            &nbsp; and&nbsp;
            <Link className="relative z-[1]" href="/privacy-policy" size="sm">
              Privacy Policy
            </Link>
          </Checkbox>
          <Button isLoading={loading} color="primary" type="submit">
            Sign Up
          </Button>
          <SocialLogin />
          <p className="text-center text-small">
            Already have an account?&nbsp;
            <Link href="/login" size="sm">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
