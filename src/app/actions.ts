'use server';

import { getQRCode, getSlugFromTitle, getUrlFromTitle } from "@/libs/qr";
import { baseFileUrl, defaultParams, s3Client } from "@/libs/s3Client";
import { Painting } from "@/types";
import { adminPassword, adminUsername, baseUrl, jwtSecret } from "@/utils/constants";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'
import { revalidateTag } from "next/cache";

const schema = z.object({
    title: z.string(),
    description: z.string(),
    collection: z.string().optional(),
    price: z.number(),
    image_url: z.string(),
    qr: z.string(),
    slug: z.string(),
    is_top: z.boolean(),
});

export async function create(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const collection = formData.get('collection') as string;
    const price = formData.get('price') as string;
    const imageFile = formData.get('imageFile') as File;
    const isTop = formData.get('is_top') === 'on' ? true : false;

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
        is_top: isTop,
    };

    const createdPainting = schema.parse(painting);

    await fetch(baseUrl + '/api/paintings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdPainting),
    });

    revalidateTag('paintings');
};

export async function update(formData: FormData) {
    const painting = Object.fromEntries(formData);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const collection = formData.get('collection') as string;
    const price = formData.get('price') as string;
    const imageFile = formData.get('imageFile') as File;
    const isTop = formData.get('is_top') === 'on' ? true : false;

    const fileBuffer = await imageFile.arrayBuffer();

    const params = {
        ...defaultParams,
        Body: Buffer.from(fileBuffer),
        Key: imageFile.name,
    };
    
    const command = new PutObjectCommand(params);

    await s3Client.send(command);

    const updatedPainting: Partial<Painting> = {
        id: Number(painting.id),
        title,
        description,
        collection,
        price: Number(price),
        is_top: isTop,
    };

    if (imageFile.name != 'undefined') {
        updatedPainting.image_url = baseFileUrl + imageFile.name;
    }

    await fetch(baseUrl + '/api/paintings', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPainting),
    });

    revalidateTag('paintings');
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
