/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  redirects: async () => {
    return [
      {
        source: "/github",
        destination: "https://github.com/Remote-Roofing/notes-library",
        permanent: true,
      },
      {
        source: "/feedback",
        destination: "https://github.com/Remote-Roofing/notes-library/issues",
        permanent: true,
      },
      {
        source: "/deploy",
        destination: "https://vercel.com/templates/next.js/novel",
        permanent: true,
      },
    ];
  },
}

export default nextConfig
