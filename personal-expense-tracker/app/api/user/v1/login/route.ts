// pages/api/v1/login.ts
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs"
import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";



interface LoginRequest{
    email: string,
    password: string
}
const prisma = new PrismaClient();

export  async function POST(req: NextRequest){
  

        const {email, password}:LoginRequest =await req.json();

        // validate input
        if(!email || !password){
            return NextResponse.json({
                message: "Email and password are required",
                status: 400
            })
        }

        try{
            // find the user by email
            

            const user = await prisma.user.findUnique({
                where:{
                    email
                }
            })
            if(!user){
                return NextResponse.json({message: "User not found"},
                    {status:401}
                )
            }
            else{
                // compare the password
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if(!isPasswordValid){
                    return NextResponse.json({message: "Invalid Password"},
                        {status:40}
                    )
                }
                else{
                    // generate a token
                    const token = jwt.sign({userId: user.id, email:  user.email}, process.env.JWT_SECRET as string, {expiresIn: "1h"});

                     // Return the token directly
        const response = NextResponse.json(
            { message: 'Login successful', token },
            { status: 200 }
        );

        // Set the token in a cookie directly
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60,
            path: '/',
        });

        return response;
                    
                }
            }
        }
        catch(e){
            console.error(e); // Log the error for debugging

        
           
                return NextResponse.json(
                    { message: "An error occurred" },
                    { status: 500 } // Internal Server Error
                );
            
            
            
            
        }
           
    
}