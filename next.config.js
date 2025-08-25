module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_OSINT_ENDPOINT: process.env.NEXT_PUBLIC_OSINT_ENDPOINT,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "assets.emersoncoronel.com",
        pathname: '/images/**',
      },
    ],
  },
};
