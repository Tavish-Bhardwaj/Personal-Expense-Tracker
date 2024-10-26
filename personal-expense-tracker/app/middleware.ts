// middleware.ts
import {NextResponse} from "next/server"
import type  {NextRequest} from "next/server"
import jwt from "jsonwebtoken"

export function validateToken(req:NextRequest){
    const token = req.cookies.get('authToken')?.value;
   
    try{
        if(!token){
            return NextResponse.redirect(new URL('/login', req.url)); //check for the url correctness after adding the frontend route
        }
        // verify the token
        const secretKey = process.env.JWT_SECRET as string;
        jwt.verify(token, secretKey);
    }catch(error){
        console.log(error);
        return NextResponse.redirect(new URL('/login', req.url));//req.url is used for getting the complete path of the upcoming request to redirect relatively to login page of the upcoming request.
    }
    return NextResponse.next();
    }
