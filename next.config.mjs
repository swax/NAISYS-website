// SOURCE: https://github.com/gregrickaby/nextjs-github-pages

import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

  // Pin workspace root so Turbopack doesn't pick up an unrelated lockfile higher in the tree.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
