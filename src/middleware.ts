import { type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { createAuthMiddleware } from './auth/create-auth-middleware';
import { routing } from './i18n/routing';

const secretPages = [
  // '/login',
  '/account',
  '/account/.*',
  // (/secret requires auth)
];

const intlMiddleware = createIntlMiddleware(routing);

// Note that this callback is only invoked if
// the `authorized` callback has returned `true`
// and not for pages listed in `pages`.
const authMiddleware = createAuthMiddleware(intlMiddleware);
const regexLocales = routing.locales.map((s) => `/${s}`);

export default function middleware(req: NextRequest) {
  const secretPathnameRegex = RegExp(
    `^(?:${regexLocales.join('|')})?(?:${secretPages.join('|')})/?$`,
    'i'
  );
  const isSecretPage = secretPathnameRegex.test(req.nextUrl.pathname);
  if (isSecretPage) {
    return authMiddleware(req);
  } else {
    return intlMiddleware(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    // This entry handles the root of the base
    // path and should always be included
    // `community` should not include by locale
    '/',
    '/((?!api|blog|community|hps_inspector|_next|.*\\..*).*)',
  ],
};
