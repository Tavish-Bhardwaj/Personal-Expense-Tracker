// // // middleware.ts
// // import {NextResponse} from "next/server"
// // import type  {NextRequest} from "next/server"
// // import jwt from "jsonwebtoken"

// // declare module 'next/server'{
// //     interface NextRequest{
// //         user?:{
// //             id: string;
// //         }
// //     }
// // }

// // export function validateToken(req:NextRequest){
// //     const token = req.cookies.get('authToken')?.value;
   
// //     try{
// //         if(!token){
// //             return NextResponse.redirect(new URL('/auth/login', req.url)); //check for the url correctness after adding the frontend route
// //         }
// //         // verify the token
// //         const secretKey = process.env.JWT_SECRET as string;
// //         const decoded = jwt.verify(token, secretKey) as {id: string};

// //         req.user = {id: decoded.id};
// //     }catch(error){
// //         console.log(error);
// //         return NextResponse.redirect(new URL('/login', req.url));//req.url is used for getting the complete path of the upcoming request to redirect relatively to login page of the upcoming request.
// //     }
// //     return NextResponse.next();
// //     }


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

declare module "next/server" {
  interface NextRequest {
    user?: { id: string };
  }
}

// export function validateToken(req: NextRequest) {
//   const token = req.cookies.get("authToken")?.value;

//   if (!token) {
//     console.log("Token missing: Redirecting to login");
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   try {
//     const secretKey = process.env.JWT_SECRET;
//     if (!secretKey) {
//       console.error("JWT_SECRET is not set in environment variables");
//       return NextResponse.redirect(new URL("/auth/login", req.url));
//     }

//     const decoded = jwt.verify(token, secretKey) as { id: string };
//     req.user = { id: decoded.id }; // Attach the user ID for later use
//   } catch (error) {
//     console.error("Token validation error:", error);
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   return NextResponse.next();
// }


// export function validateToken(req: NextRequest) {
//     console.log("Validating token...");
  
//     const token = req.cookies.get("token")?.value;
//   console.log(token);
//     if (!token) {
//       console.log("Token missing: Redirecting to login");
//       return NextResponse.redirect(new URL("/auth/login", req.url));
//     }
  
//     try {
//       const secretKey = process.env.JWT_SECRET;
//       if (!secretKey) {
//         console.error("JWT_SECRET is not set in environment variables");
//         return NextResponse.redirect(new URL("/auth/login", req.url));
//       }
  
//       console.log("Decoding token...");
//       const decoded = jwt.verify(token, secretKey) as { id: string };
  
//       console.log("Setting user ID in request...");
//       req.user = { id: decoded.id }; // Attach the user ID for later use
//     } catch (error) {
//       console.error("Token validation error:", error);
//       return NextResponse.redirect(new URL("/auth/login", req.url));
//     }
  
//     console.log("Token validation successful");
//     return NextResponse.next();
//   }

export function validateToken(req: NextRequest): NextResponse | undefined {
    console.log("Validating token...");
  
    const token = req.cookies.get("token")?.value;
  
    if (!token) {
      console.log("Token missing: Redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  
    try {
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        console.error("JWT_SECRET is not set in environment variables");
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
  
      console.log("Decoding token...");
      const decoded = jwt.verify(token, secretKey) as { id: string };
  
      console.log("Token validation successful");
      // Attach user ID to request (for middleware-like behavior, you'll need a different solution)
      return undefined; // No response; let the handler proceed
    } catch (error) {
      console.error("Token validation error:", error);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
  