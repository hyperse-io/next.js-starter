import type { NextConfig } from 'next';
import withNextIntl from 'next-intl/plugin';
import { z } from 'zod';
import {
  createNextConfig,
  createNextConfigEnv,
  type NextConfigPlugin,
} from '@hyperse/next-config';
import withNextInspector from '@hyperse/next-inspector/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const plugins: NextConfigPlugin[] = [
  withNextIntl(),
  withNextInspector({
    trustedEditor: 'cursor', // or 'vscode', 'webstorm', etc.
    customLaunchEditorEndpoint: '/hps_inspector',
    keys: ['$mod', 'i'], // Customize hotkeys
    hideDomPathAttr: false,
  }),
  bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  }),
];

// We use a custom env to validate the build env
const buildEnv = createNextConfigEnv(
  z.object({
    NEXT_PUBLIC_AUTH_URL: z.string(),
    NEXT_PUBLIC_SHOP_API: z.string(),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
    NEXT_BUILD_ENV_OUTPUT: z
      .enum(['standalone', 'export'], {
        error:
          'For standalone mode: https://nextjs.org/docs/app/api-reference/next-config-js/output',
      })
      .optional(),
    STRIPE_PUBLISHABLE_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
  })
);

const config: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  env: {
    ...buildEnv,
  },
  allowedDevOrigins: [
    'www.issilo.com',
    'file.issilo.com',
    'file-stage.issilo.com',
    'checkout.stripe.com',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'demo-glass.hyperse.net',
      },
      {
        protocol: 'https',
        hostname: 'file.issilo.com',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  output: buildEnv.NEXT_BUILD_ENV_OUTPUT,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(config: any) {
    config.cache = {
      type: 'memory',
      cacheUnaffected: true,
    };
    // We must setup the svg loader manually for webpack, because next build can only run with `webpack`
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default createNextConfig(config, plugins);
