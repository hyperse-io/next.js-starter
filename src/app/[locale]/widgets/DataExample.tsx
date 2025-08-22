'use client';

import { Suspense } from 'react';
import { fetchGithubProject } from '@/data/githubProject/fetchGithubProject';
import { useGithubProject } from '@/data/githubProject/useGithubProject';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
} from '@heroui/react';
import { ProjectExample } from './ProjectExample';

export const DataExample = () => {
  const { data, error, isLoading, isValidating, mutate } =
    useGithubProject('vercel/swr');
  const projectFetcher = fetchGithubProject('vercel/swr');
  return (
    <Card className="mx-auto w-full max-w-6xl">
      <CardHeader>
        <h2 className="text-2xl font-bold">Data Example</h2>
      </CardHeader>
      <CardBody className="flex flex-col items-center gap-2">
        <div>
          <p className="text-center">
            Loading: {isValidating ? 'true' : 'false'}
          </p>
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

        <Divider />

        <div>
          <Suspense fallback={<Spinner variant="gradient" color="primary" />}>
            <ProjectExample projectFetcher={projectFetcher} />
          </Suspense>
        </div>
      </CardBody>
    </Card>
  );
};
