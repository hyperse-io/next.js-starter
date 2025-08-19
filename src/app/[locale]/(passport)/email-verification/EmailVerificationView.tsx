import { EmailVerificationForm } from './EmailVerificationForm';

type EmailVerificationViewProps = {
  token: string;
};
export const EmailVerificationView = ({
  token,
}: EmailVerificationViewProps) => {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <EmailVerificationForm token={token} />
    </div>
  );
};
