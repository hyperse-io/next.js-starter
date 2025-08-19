'use client';

import { useRouter } from '@/hooks/useRouter';
import { Button } from '@heroui/button';
import { Link } from '@heroui/react';

export type Error500Props = {
  error: Error;
  reset(): void;
};

export function Error500(_props: Error500Props) {
  const router = useRouter();
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] leading-tight font-bold">500</h1>
        <span className="font-medium">Oops! Something went wrong!</span>
        <p className="text-muted-foreground text-center">
          We apologize for the inconvenience.
          <br />
          Please try again later.
        </p>
        <div className="mt-6 flex gap-4">
          <Button
            variant="bordered"
            as={Link}
            onPress={() => {
              router.back();
            }}
          >
            Go Back
          </Button>
          <Button variant="solid" color="primary" as={Link} href="/">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
