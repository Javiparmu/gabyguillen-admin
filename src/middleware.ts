import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { adminPassword, adminUsername, jwtSecret } from './utils/constants';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value;

    if (session != null) {
        const { payload } = await jwtVerify(session, jwtSecret, {
            maxTokenAge: '30d',
        })

        const { username, password } = payload;

        if (request.nextUrl.pathname.startsWith('/dashboard')) {
            if (username != adminUsername || password != adminPassword) {
                return NextResponse.redirect(new URL('/', request.url))
            }
        } 
        
        if (request.nextUrl.pathname === '/' ) {
            if (username == adminUsername && password == adminPassword) {
                return NextResponse.redirect(new URL('/dashboard', request.url))
            }
        }
    } else if (request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', request.url))
    } 
}
 
export const config = {
  matcher: ['/', '/dashboard'],
}