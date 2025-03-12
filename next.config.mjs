/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";

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
        source: "/api/:path*",
        destination: "http://Arthur:Arthur@102.0.14.218/rest/:path*",
      },
      {
        source: "/backend/:path*",
        destination: isProduction ? "http://139.59.60.20:8000/:path*" : "http://localhost:8000/:path*",
      },
      {
        source: "/microservice/:path*",
        destination: "http://139.59.60.20:3001/:path*",
      },
      {
        source: "/test",
        destination: "http://localhost:8000",
      },
    ];
  },
};

export default nextConfig;
