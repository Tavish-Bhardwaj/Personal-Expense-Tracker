// utils/auth.ts
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  userId: string;
  email: string;
}

export const getUserFromToken = (token: string): { userId: string; email: string } | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    return { userId: decoded.userId, email: decoded.email };
  } catch (error) {
    console.error('Invalid token:', error);
    return null; // Return null instead of the error object for better type safety
  }
};