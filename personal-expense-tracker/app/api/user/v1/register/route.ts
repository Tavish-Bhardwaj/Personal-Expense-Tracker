// 


// api/v1/register.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

// Instantiate Prisma Client outside the handler
const prisma = new PrismaClient();

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export async function POST(req: NextRequest) {
    try {
        const { email, password, name }: RegisterRequest = await req.json();

        // Validate input
        if (!email || !password || !name) {
            return NextResponse.json(
                { message: "Name, email, and password are required" },
                { status: 400 } // Bad Request
            );
        }
        

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        // Send back a confirmation message with basic user information
        return NextResponse.json(
            { user: { id: user.id, email: user.email, name: user.name } },
            { status: 200 } // OK
        );
    } catch (e) {
        console.error(e); // Log the error for debugging

        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                // P2002 is the code for unique constraint violation
                return NextResponse.json(
                    { message: "Email already exists" },
                    { status: 409 } // Conflict
                );
            } else {
                return NextResponse.json(
                    { message: "An error occurred" },
                    { status: 500 } // Internal Server Error
                );
            }
        } else {
            return NextResponse.json(
                { message: "An unexpected error occurred" },
                { status: 500 } // Internal Server Error
            );
        }
    }


}