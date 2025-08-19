'use client';

import { useGithubProject } from '@/data/githubProject/useGithubProject';
import { Button } from '@heroui/react';

export const DataExample = () => {
  const { data, error, isLoading, isValidating, mutate } =
    useGithubProject('vercel/swr');
  return (
    <div>
      <p>Loading: {isValidating ? 'true' : 'false'}</p>
      <Button
        isLoading={isLoading}
        variant="flat"
        onPress={() => {
          mutate();
        }}
      >
        {data?.name}
      </Button>
      {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
    </div>
  );
};
