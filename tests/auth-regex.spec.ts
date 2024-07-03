describe('Auth middleware path pattern', () => {
  it('should correct handle auth middleware regex', () => {
    const secretPages = ['/secret', '/account', '/account/.*'];
    const secretMapping: Array<[string, boolean]> = [
      ['/', false],
      ['/zh', false],
      ['/zh/', false],
      ['/en', false],
      ['/en/', false],
      ['/login', false],
      ['/login/', false],
      ['/zh/login', false],
      ['/zh/login/', false],
      ['/en/login', false],
      ['/en/login/', false],
      ['/account', true],
      ['/account/', true],
      ['/zh/account', true],
      ['/en/account', true],
      ['/zh/account/', true],
      ['/en/account/', true],
      ['/account/profile', true],
      ['/account/profile/', true],
      ['/zh/account/profile', true],
      ['/zh/account/profile/', true],
      ['/en/account/profile', true],
      ['/en/account/profile/', true],
    ];
    const locales = ['en', 'zh'].map((s) => `/${s}`);
    const secretPathnameRegex = RegExp(
      // /^(\/(en|zh))?(\/account\/.*)?\/?$/i
      // /^(\/(zh|en))?(\/secret|\/account\/.*)\/?$/i
      `^(?:${locales.join('|')})?(?:${secretPages.join('|')})/?$`,
      'i'
    );
    for (const [pathname, result] of secretMapping) {
      const isSecretPage = secretPathnameRegex.test(pathname);
      expect(isSecretPage).toBe(result);
    }
  });
});
