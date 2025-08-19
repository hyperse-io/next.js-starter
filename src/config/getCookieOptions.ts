/**
 * Get cookie options
 * @param maxAgeInSeconds - max age in seconds (default: 30 days)
 * @returns
 */
export const getCookieOptions = (maxAgeInSeconds = 60 * 60 * 24 * 30) => {
  // 30 days (in seconds)
  const currentTime = new Date();
  const expiresDate = new Date(currentTime.getTime() + maxAgeInSeconds * 1000);
  // const expires = expiresDate.toUTCString();
  return {
    // cache 30 days
    maxAge: maxAgeInSeconds,
    expires: expiresDate,
  };
};
