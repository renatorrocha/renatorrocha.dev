import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/services/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "go-skill-icons.vercel.app",
        pathname: "/api/icons/**",
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "https://renatorrocha.dev/en",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default withNextIntl(nextConfig);
