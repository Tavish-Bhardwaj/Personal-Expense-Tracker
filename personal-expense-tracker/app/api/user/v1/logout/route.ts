// app/api/user/v1/logout/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    // Clear the token cookie
    const res = NextResponse.redirect('http://localhost:3000/auth/login');

    // Set the cookie to expire
    res.cookies.set('token', '', {
        maxAge: 0,
        path: '/',
        httpOnly: true, 
    });

    return res;
}