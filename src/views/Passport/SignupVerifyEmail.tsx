interface SignupVerifyEmailProps {
  email: string;
}

export const SignupVerifyEmail = ({ email }: SignupVerifyEmailProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-medium">Check your email</p>
      <p className="text-default-600">
        We have sent a verification email to{' '}
        <span className="text-primary font-bold">{email}</span>
      </p>
      <p className="text-default-600">
        Please click the link in the email to complete your registration.
      </p>
    </div>
  );
};
