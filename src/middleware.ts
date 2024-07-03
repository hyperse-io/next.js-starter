import { type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { createAuthMiddleware } from './auth/create-auth-middleware';
import { locales } from './navigation';

const secretPages = [
  // '/login',
  '/account',
  '/account/.*',
  // (/secret requires auth)
];

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'en',
  // pathnames,
});

// Note that this callback is only invoked if
// the `authorized` callback has returned `true`
// and not for pages listed in `pages`.
const authMiddleware = createAuthMiddleware(intlMiddleware);
const regexLocales = locales.map((s) => `/${s}`);
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
  matcher: ['/((?!api|_next|.*\\..*).*)'],
  runtime: 'nodejs',
};
