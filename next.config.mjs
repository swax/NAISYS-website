// SOURCE: https://github.com/gregrickaby/nextjs-github-pages

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Configuration for SSG (static site generation) */
  output: "export",

  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
