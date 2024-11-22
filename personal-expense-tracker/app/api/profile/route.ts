import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "../../middleware"; 
import { getUserFromToken } from "../../utils/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();



export async function GET(request: NextRequest) {
    console.log("GET request received");
  
    // Extract the token from the cookies
    const tokenCookie = request.cookies.get('token'); // Adjust the cookie name if necessary
  
    // Check if the token cookie exists
    if (!tokenCookie) {
      console.log("Token missing: Redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  
    // Extract the token value
    const token = tokenCookie.value;
    const user = getUserFromToken(token);
  
    if (!user) {
      console.log("Invalid token: Redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  
    const { userId, email } = user;
    console.log(`User  ID: ${userId}, Email: ${email}`);
  
    // Fetch user data from the database
    const userRecord = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) }, // Use parseInt if DB schema requires integer
    });
  
    console.log(`User  found: ${userRecord ? "yes" : "no"}`);
  
    if (!userRecord) {
      return NextResponse.json({ error: "User  not found" }, { status: 404 });
    }
  
    return NextResponse.json({ user: userRecord });
  }




export async function PUT(request: NextRequest) {
    const tokenCookie = request.cookies.get('token'); // Adjust the cookie name if necessary
  
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
    console.log(`Email: ${email}, User ID: ${userIdNumber}`);
  
    // Parse the request body
    const { newEmail, newName, currentPassword, newPassword } = await request.json();
    console.log(newName);
  
    // Update name
    if (newName) {
      // Trim the newName to remove leading and trailing spaces
      const trimmedName = newName.trim();
  
      // Check if the trimmed name is empty
      if (trimmedName.length === 0) {
        return NextResponse.json({ error: "Name cannot be empty or consist only of spaces" }, { status: 400 });
      }
  
      try {
        // Update name
        await prisma.user.update({
          where: { id: userIdNumber },
          data: { name: trimmedName }, // Assuming 'name' is the field in your database
        });
        console.log(`Name updated to: ${trimmedName}`);
        return NextResponse.json({ message: "Name updated successfully" }); // Return success response
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error updating name" }, { status: 500 });
      }
    }
  
    // Update email
    if (newEmail) {
      try {
        const emailExists = await prisma.user.findUnique({
          where: { email: newEmail },
        });
  
        if (emailExists) {
          return NextResponse.json({ error: "Email already exists" }, { status: 409 });
        }
  
        // Update email
        await prisma.user.update({
          where: { id: userIdNumber },
          data: { email: newEmail },
        });
        return NextResponse.json({ message: "Email updated successfully" }); // Return success response
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error updating email" }, { status: 500 });
      }
    }
  
    // Update password
    if (newPassword) {
      try {
        const userRecord = await prisma.user.findUnique({
          where: { id: userIdNumber },
        });
  
        if (!userRecord || !(await bcrypt.compare(currentPassword, userRecord.password))) {
          return NextResponse.json({ error: "Incorrect current password" }, { status: 401 });
        }
  
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
          where: { id: userIdNumber },
          data: { password: hashedPassword },
        });
  
        return NextResponse.json({ message: "Password updated successfully" }); // Return success response
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error updating password" }, { status: 500 });
      }
    }
  
    return NextResponse.json({ error: "Invalid request: No fields to update provided" }, { status: 400 });
  }
  