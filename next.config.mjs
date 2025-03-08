// next.config.mjs
export default {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**", // This allows any path in the domain
      },
    ],
  },
};
