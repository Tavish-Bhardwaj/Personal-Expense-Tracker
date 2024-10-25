// pages/api/v1/register.ts
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client/extension";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/react-native.js";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method === "POST"){
        const{email, password, name}= req.body;

        // validate input
        if(!email || !password || !name){
            return res.status(400).json({message: "Name, email and password are required"});
        }


        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const prisma = new PrismaClient();
        // create a new user
        try{
            const user = await prisma.user.create({
                data:{
                    email,
                    password:hashedPassword,
                    name
                }
            

            })

            // send back a confirmation message with basic user information
            res.status(200).json({user: {id: user.id, email:user.email, name:user.name}});
           
        }
        catch(e){
            if(e instanceof PrismaClientKnownRequestError){

                if(e.code==="P2002"){
                   // P2002 is the code for unique constraint violation
                   return res.status(409).json({message: "Email already exists"});
                }
                else{
                    return res.status(500).json({message: "An error occurred"});
                }
            }
        }
    
    }
    else{
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
