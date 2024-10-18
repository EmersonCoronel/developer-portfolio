module.exports = {
  reactStrictMode: true,
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
