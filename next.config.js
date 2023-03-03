/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        pathname: '/**',
        hostname: 'flagcdn.com',
        port: '', 
      },
      {
        protocol: 'https',
        hostname:'upload.wikimedia.org',
        port: '',
        pathname: '/**'
      }
    ]
  },
  experimental:{
    appDir: true,
  }
}
