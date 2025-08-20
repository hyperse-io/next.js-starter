import { fetcher } from '@/common/fetcher';

export const fetchGithubProject = async (
  project: string
): Promise<{
  name: string;
  description: string;
}> => {
  const res = await fetcher(`https://api.github.com/repos/${project}`);
  return res satisfies {
    name: string;
  };
};
