import { S3Client } from "@aws-sdk/client-s3";

const REGION = process.env.NEXT_PUBLIC_S3_REGION;

export const defaultParams = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
};

export const baseFileUrl = 'https://gaby-guillen-art-paintings.s3.eu-west-1.amazonaws.com/'

const s3Client = new S3Client({ region: REGION, credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ?? '',
} });

export { s3Client };