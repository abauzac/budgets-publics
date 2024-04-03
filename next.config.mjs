/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: process.env.NODE_ENV === "production" ? "/budgets-publics": undefined,
    images: {
        unoptimized: true,
    },
    reactStrictMode: true,
};

export default nextConfig;
