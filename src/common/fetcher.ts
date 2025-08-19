import { logger } from './logger';

export const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (err) {
    logger.error(err as Error);
    throw err;
  }
};
