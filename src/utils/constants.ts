export const baseUrl = process.env.BASE_URL;

export const mainUrl = process.env.MAIN_URL;

export const toastDuration = 3000;

export const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;

export const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export const jwtSecret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
