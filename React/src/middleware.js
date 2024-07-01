
import { NextResponse } from "next/server"

export default function middleware(request) {
    const token = request.cookies.get('auth_token');
    const { pathname } = request.nextUrl;

    if (pathname === '/' && token) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }
    
    if (!token && pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/admin/:path*']
}