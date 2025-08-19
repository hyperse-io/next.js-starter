import { use } from 'react';
import type { fetchGithubProject } from '@/data/githubProject/fetchGithubProject';

type ProjectExampleProps = {
  projectFetcher: Promise<Awaited<ReturnType<typeof fetchGithubProject>>>;
};

export const ProjectExample = ({ projectFetcher }: ProjectExampleProps) => {
  const project = use(projectFetcher);
  return <div>{project.name}</div>;
};
