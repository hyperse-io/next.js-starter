import { type NextRequest, NextResponse } from 'next/server.js';
import { ensureSlash } from '@/utils/ensureSlash';
import { getSession } from './get-session';

export const createAuthMiddleware = (
  nextMiddleware: (request: NextRequest) => NextResponse<unknown>
) => {
  return async (req: NextRequest) => {
    // Wrapper a proxy to make `getSession` work for `edg` runtime mode.
    const session = await getSession(req);
    if (!session) {
      const loginPage = `/login`;
      const wantToPathname = req.nextUrl.pathname;
      const wantToHref = process.env.NEXT_PUBLIC_AUTH_URL
        ? `${ensureSlash(process.env?.NEXT_PUBLIC_AUTH_URL)}${wantToPathname}`
        : req.nextUrl.href;

      if (wantToPathname !== loginPage) {
        // Redirect to signin page by default if not authorized
        req.nextUrl.pathname = loginPage;
        req.nextUrl.searchParams.set(`callbackUrl`, wantToHref);
        return NextResponse.redirect(req.nextUrl);
      }
    }
    return nextMiddleware(req);
  };
};
