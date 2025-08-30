import { NextConfig } from 'next'
import createMDX from '@next/mdx'
const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  output: 'standalone',
  basePath: '/blog',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
}
const withMDX = createMDX({
  extension: /\.mdx?$/,
})
export default withMDX(nextConfig)