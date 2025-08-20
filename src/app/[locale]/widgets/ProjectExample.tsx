import { use } from 'react';
import type { fetchGithubProject } from '@/data/githubProject/fetchGithubProject';

type ProjectExampleProps = {
  projectFetcher: Promise<Awaited<ReturnType<typeof fetchGithubProject>>>;
};

export const ProjectExample = ({ projectFetcher }: ProjectExampleProps) => {
  const project = use(projectFetcher);
  return (
    <div className="space-y-2">
      <p>{project.name}</p>
      <p>{project.description}</p>
    </div>
  );
};
