import { useMediaQuery } from 'usehooks-ts';

/**
 * Check if the screen is mobile
 * @returns true if the screen is mobile
 */
export function useMobile() {
  return useMediaQuery('(max-width: 768px)');
}
