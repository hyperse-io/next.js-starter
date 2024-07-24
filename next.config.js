import withNextIntl from 'next-intl/plugin';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import { z } from 'zod';
import { getNextConfig, getNextConfigEnv } from '@hyperse-io/next-env';
import bundleAnalyzer from '@next/bundle-analyzer';

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  font-src 'self';
  frame-src giscus.app
`;

const isDev = process.env.NODE_ENV === 'development';

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const plugins = [];

plugins.push(
  withNextIntl('./src/i18n.ts'),
  bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })
);

// We use a custom env to validate the build env
const buildEnv = getNextConfigEnv(
  z.object({
    NEXT_BUILD_ENV_OUTPUT: z
      .enum(['standalone', 'export'], {
        description:
          'For standalone mode: https://nextjs.org/docs/app/api-reference/next-config-js/output',
      })
      .optional(),
    NEXT_PUBLIC_AUTH_URL: z.string(),
    NEXT_PUBLIC_SHOP_API: z.string(),
  }),
  {
    isProd: process.env.ANALYZE === 'production',
  }
);

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 * @type {import("next").NextConfig}
 */
const config = {
  reactStrictMode: true,
  output: buildEnv.NEXT_BUILD_ENV_OUTPUT,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  eslint: {
    dirs: ['src'],
  },
  webpack(config) {
    if (isDev) {
      config.plugins.push(
        // SSR can't not remove data-insp-path from `html` tag, so do not set hideDomPathAttr to false
        codeInspectorPlugin({ bundler: 'webpack', hideDomPathAttr: false })
      );
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default getNextConfig(
  plugins.reduce((config, plugin) => plugin(config), config)
);
