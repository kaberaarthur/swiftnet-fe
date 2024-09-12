/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Matches API paths
        destination: "http://Arthur:Arthur@102.0.5.26/rest/:path*", // Embed username:password in the URL
      },
      {
        source: "/backend/:path*", // Matches API paths
        destination: "http://localhost:8000/:path*", // Embed username:password in the URL
      },
    ];
  },
};

export default nextConfig;
