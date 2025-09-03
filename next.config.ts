import { NextConfig } from 'next'
import createMDX from '@next/mdx'
const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  output: 'export', // Enable static export
  distDir: 'build', // Output directory
  basePath: '/blog',
  trailingSlash: true, // Add trailing slash for static export compatibility
  images: {
    unoptimized: true
  }
}
const withMDX = createMDX({
  extension: /\.mdx?$/,
})
export default withMDX(nextConfig)