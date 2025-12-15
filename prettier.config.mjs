/**
 * prettier.config.mjs
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  /**
   * Path to the CSS stylesheet used by Tailwind CSS (v4+)
   */
  tailwindStylesheet: './src/theme/globals.css',
  /**
   * List of custom function and tag names that contain classes.
   */
  tailwindFunctions: ['tw', 'tv', 'clsx', 'twMerge', 'extendVariants'],
  /**
   * List of custom attributes that contain classes.
   */
  tailwindAttributes: ['className', 'classNames'],
};

export default config;
