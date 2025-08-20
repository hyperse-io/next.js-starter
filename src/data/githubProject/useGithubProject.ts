import useSWR from 'swr';
import { fetchGithubProject } from './fetchGithubProject';

export const useGithubProject = (project: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `https://api.github.com/repos/${project}`,
    () => fetchGithubProject(project)
  );

  return { data, error, isLoading, isValidating, mutate };
};
