'use server';

import { getFileBuffer } from "@/libs/file";
import { base64ToFile, getQRCode, getSectionIdFromTitle, getUrlFromTitle } from "@/libs/qr";
import { baseFileUrl, defaultParams, s3Client } from "@/libs/s3Client";
import { Painting } from "@/types";
import { baseUrl } from "@/utils/constants";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
    title: z.string(),
    description: z.string(),
    collection: z.string(),
    price: z.string(),
    imageFile: z.unknown(),
});

export async function create(formData: FormData) {
    const painting = schema.parse(Object.fromEntries(formData));
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const collection = formData.get('collection') as string;
    const price = formData.get('price') as string;
    const imageFile = formData.get('imageFile') as File;

    const fileBuffer = await imageFile.arrayBuffer();

    const params = {
        ...defaultParams,
        Body: Buffer.from(fileBuffer),
        Key: imageFile.name,
    };
    
    const command = new PutObjectCommand(params);

    await s3Client.send(command);

    const paintingUrl = getUrlFromTitle(title);

    const base64Qr = await getQRCode(paintingUrl);

    const qrFileName = getSectionIdFromTitle(title) + '.png';

    const qrFile = Buffer.from(base64Qr, 'base64');

    const qrParams = {
        ...defaultParams,
        Body: qrFile,
        Key: qrFileName,
    };

    const qrCommand = new PutObjectCommand(qrParams);

    await s3Client.send(qrCommand);

    const createdPainting: Partial<Painting> = {
        ...painting,
        title,
        description,
        collection,
        price: Number(price),
        image_url: baseFileUrl + imageFile.name,
        qr: baseFileUrl + qrFileName,
    };

    await fetch(baseUrl + '/api/paintings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdPainting),
    });

    revalidatePath('/dashboard');
};

export async function update(formData: FormData) {
    const painting = schema.parse(Object.fromEntries(formData));
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const collection = formData.get('collection') as string;
    const price = formData.get('price') as string;
    const imageFile = formData.get('imageFile') as File;

    const fileBuffer = await imageFile.arrayBuffer();

    const params = {
        ...defaultParams,
        Body: Buffer.from(fileBuffer),
        Key: imageFile.name,
    };
    
    const command = new PutObjectCommand(params);

    await s3Client.send(command);

    const updatedPainting: Partial<Painting> = {
        ...painting,
        title,
        description,
        collection,
        price: Number(price),
        image_url: baseFileUrl + imageFile.name,
    };

    await fetch(baseUrl + '/api/paintings', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPainting),
    });

    revalidatePath('/dashboard');
}
