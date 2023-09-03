/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'cdn.pixabay.com', 'gaby-guillen-art-paintings.s3.eu-west-1.amazonaws.com'],
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
