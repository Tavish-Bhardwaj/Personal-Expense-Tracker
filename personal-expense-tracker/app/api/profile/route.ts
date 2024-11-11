import {NextRequest, NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// update email

export async function PUT(request: NextRequest){
    const {userId, newEmail, currentPassword, newPassword} = await request.json();

    if(!userId){
        return NextResponse.json({error: "Unauthorised"}, {status:401});
    }

    if(newEmail){
        try{
            const emailExists = await prisma.user.findUnique({
                where:{email: newEmail},
            })

            if(emailExists){
                return NextResponse.json({error: "Email already exists"}, {status:409});
            }

            // update email
            await prisma.user.update({
                where:{id: userId},
                data:{email: newEmail},
            })
            return NextResponse.json({message: "Email updated successfully"})
        }catch(error){
            console.log(error);
            return NextResponse.json({error: "Error updating email"}, {status: 500});
        }
    }

    // update password
    if(newPassword){
        try{
            const user = await prisma.user.findUnique({
                where: {id: userId} });
                if(!user || !(await bcrypt.compare(currentPassword, user.password))){
                    return NextResponse.json({error: "Incorrect current password"}, {status: 401})
                }

                const hashedPassword = await bcrypt.hash(newPassword, 10);
                await prisma.user.update({
                    where:{id: userId},
                    data:{password: hashedPassword},
                });

                return NextResponse.json({message: "Password updated Successfully"}, {status: 200});
            }catch(error){
                console.log(error);
                return NextResponse.json({error: "Error updating password"}, {status: 500})
            }
            
           
        }
        return NextResponse.json({error: "Invalid request"}, {status: 500});
    }
