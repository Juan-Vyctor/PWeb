import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Os posters retornados pelo OMDb ficam hospedados neste domínio.
    // Sem esta liberação, o componente <Image> do Next.js recusa a URL externa.
    remotePatterns: [new URL("https://m.media-amazon.com/images/M/**")],
  },
};

export default nextConfig;
