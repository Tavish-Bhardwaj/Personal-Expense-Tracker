// import {NextRequest, NextResponse} from "next/server"
// import {PrismaClient} from "@prisma/client"
// import { validateToken } from "@/app/middleware"


// const prisma = new PrismaClient();
// export async function POST(req:NextRequest){
//     const tokenValidationResponse = await validateToken(req);
//     if(tokenValidationResponse === undefined){
//         return NextResponse.redirect("/auth/login")

//     }

//     const {userId} = JSON.parse(req.nextUrl.searchParams.get('user') || '{}');
//     const{name} = await req.json();

//     if(!name){
//         return NextResponse.json({error: "Category name is required"}, {status:400});
//     }

//     try{
//         const category = await prisma.category.create({
//             data: {
//                 name,
//                 userId,
//             },
            
//         });
//         return NextResponse.json(category, {status:201});
//     }catch(error){
//         console.log(error);
//         return NextResponse.json({error: 'Error creating category'},{status:500});
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserFromToken } from "@/app/utils/auth";
import { validateToken } from "@/app/middleware";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const tokenValidationResponse = await validateToken(req);

  if (tokenValidationResponse === undefined) {
    
      
      
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
    const userIdNumber = parseInt(userId, 10); // Convert userId to a number
    
    // Assuming validateToken returns user info with userId
    
    
    const { name } = await req.json();
    
    if (!name) {
        return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }
    
    try {

        const check = await prisma.category.findFirst({
            where:{
                name: name,
                userId: userIdNumber
            }
        })

        if(check){
            return NextResponse.json({message: "Category already exists"}, {status: 409})
        }
        else{

            const category = await prisma.category.create({
                data: {
                    name,
                    userId:userIdNumber
                },
            });
            
            return NextResponse.json(category, { status: 201 });
        }
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ error: "Error creating category" }, { status: 500 });
    }
}
}
