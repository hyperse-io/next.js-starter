'use client';

import { useGithubProject } from '@/data/githubProject/useGithubProject';
import { Button } from '@heroui/react';

export const DataExample = () => {
  const { data, error, isLoading, isValidating, mutate } =
    useGithubProject('vercel/swr');
  return (
    <div className="space-y-2">
      <p className="text-center">Loading: {isValidating ? 'true' : 'false'}</p>
      <div className="text-center">
        <Button
          isLoading={isLoading}
          color="primary"
          onPress={() => {
            mutate();
          }}
        >
          {data?.name}
        </Button>
        <p>{data?.description}</p>
      </div>
      {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
    </div>
  );
};
