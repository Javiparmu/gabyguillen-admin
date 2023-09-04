/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'gaby-guillen-art-paintings.s3.eu-west-1.amazonaws.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gaby-guillen-art-paintings.s3.eu-west-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
