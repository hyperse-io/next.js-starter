export const getCookieOptions = () => {
  const maxAgeInSeconds = 60 * 60 * 24 * 30;
  const currentTime = new Date();
  const expiresDate = new Date(currentTime.getTime() + maxAgeInSeconds * 1000);
  // const expires = expiresDate.toUTCString();
  return {
    // cache 30 days
    maxAge: maxAgeInSeconds,
    expires: expiresDate,
  };
};
