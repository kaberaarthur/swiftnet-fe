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
        destination: "http://Arthur:Arthur@102.0.14.218/rest/:path*", // Embed username:password in the URL
      },
      {
        source: "/backend/:path*", // Matches API paths
        // destination: "http://localhost:8000/:path*", // Embed username:password in the URL
        destination: "http://139.59.60.20:8000/:path*", // Embed username:password in the URL
      },
      {
        source: "/microservice/:path*", // Matches API paths
        // destination: "http://localhost:8000/:path*", // Embed username:password in the URL
        destination: "http://139.59.60.20:3001/:path*", // Embed username:password in the URL
      },
      {
        source: "/test",
        destination: "http://localhost:8000",
      },
    ];
  },
};

export default nextConfig;
