/**
 * Check if the current pathname matches the slug
 * @example
 * ```ts
 *  1. isPathMatchRoute(`/account`, `/account?name=tian#/hash`) ==> true
 *  2. isPathMatchRoute(`/account`, `/account/?name=tian#/hash`) ==> false
 * ```
 * @param asPath useRouter().asPath `/account`
 * @param slug `/account?name=tian#/hash`
 * @returns
 */
export const isPathMatchRoute = (pathname: string, slug: string) => {
  const pathNameRegexp = /[^?#]*/;
  const asPathName = pathNameRegexp.exec(pathname);
  const hrefPathName = pathNameRegexp.exec(slug);
  if (!asPathName || !hrefPathName) {
    return false;
  }
  return asPathName[0] === hrefPathName[0];
};
