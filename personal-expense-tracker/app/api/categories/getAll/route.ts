import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
import { getUserFromToken } from "@/app/utils/auth";
import { validateToken } from "@/app/middleware";

const prisma = new PrismaClient();

export async function GET(req: NextRequest){
    const tokenValidationResponse = await validateToken(req);
    if(tokenValidationResponse === undefined){
       
        
        const tokenCookie = req.cookies.get('token'); // Adjust the cookie name if necessary
        
        // Check if the token cookie exists
        if (!tokenCookie) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        
        // Extract the token value
        const token = tokenCookie.value; // Assuming tokenCookie is of type RequestCookie
        const user = getUserFromToken(token);
        
        if (!user) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 402 });
        }
        
        const { userId, email } = user;
        const userIdNumber = parseInt(userId, 10);
        try{
            const categories = await prisma.category.findMany({
                where: {userId:userIdNumber},
            });
            
            return NextResponse.json(categories, {status: 200});
        }catch(error){
            console.log(error);
            return NextResponse.json({error: "Error fetching categories"}, {status: 500});
        }
    }
    }