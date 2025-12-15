export const fetchGithubProject = async (
  project: string
): Promise<{
  name: string;
  description: string;
}> => {
  const res = await fetch(`https://api.github.com/repos/${project}`);
  const data = await res.json();
  return data satisfies {
    name: string;
    description: string;
  };
};
