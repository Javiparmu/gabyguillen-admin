'use server';

import { getQRCode, getSlugFromTitle, getUrlFromTitle } from "@/libs/qr";
import { baseFileUrl, defaultParams, s3Client } from "@/libs/s3Client";
import { Painting } from "@/types";
import { adminPassword, adminUsername, baseUrl, jwtSecret } from "@/utils/constants";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'

const schema = z.object({
    title: z.string(),
    description: z.string(),
    collection: z.string().optional(),
    price: z.number(),
    image_url: z.string(),
    qr: z.string(),
    slug: z.string(),
});

export async function create(formData: FormData) {
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

    let base64Qr = await getQRCode(paintingUrl);

    const base64Prefix = "data:image/png;base64,";
    if (base64Qr.startsWith(base64Prefix)) {
        base64Qr = base64Qr.substring(base64Prefix.length);
    }

    const slug = getSlugFromTitle(title);

    const qrFilename = slug + '.png';

    const qrFile = Buffer.from(base64Qr, 'base64');

    const qrParams = {
        ...defaultParams,
        Body: qrFile,
        Key: qrFilename,
    };

    const qrCommand = new PutObjectCommand(qrParams);

    await s3Client.send(qrCommand);

    const painting: Partial<Painting> = {
        title,
        description,
        collection,
        price: Number(price),
        image_url: baseFileUrl + imageFile.name,
        qr: baseFileUrl + qrFilename,
        slug,
    };

    const createdPainting = schema.parse(painting);

    console.log("createdPainting", createdPainting);

    await fetch(baseUrl + '/api/paintings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdPainting),
    });
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
}

export async function login(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (username === adminUsername && password === adminPassword) {
        const sessionToken = await new SignJWT({ username, password }).setExpirationTime('30d').setProtectedHeader({ alg: 'HS256' }).setIssuedAt().sign(jwtSecret);

        cookies().set('session', sessionToken, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

        return {
            success: true,
        }
    } else {
        return {
            success: false,
        }
    }

}
