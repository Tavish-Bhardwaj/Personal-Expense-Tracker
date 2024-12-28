

// pages/login.tsx
"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { AuthForm } from "@/app/components/AuthForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage: React.FC = () => {
    const { login, errorMessage } = useAuth(); // Get errorMessage from context
    const router = useRouter();
    const [loginError, setLoginError] = useState<string | null>(null); // Local state for login error

    const handleLogin = async (data: { email: string; password: string }) => {
        try {
            const { email, password } = data;
            await login(email, password);
            router.push("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
            // Check if the error is an instance of Error and set the message
            if (error instanceof Error) {
                setLoginError(error.message); // Set the error message from the caught error
            } else {
                setLoginError("An unexpected error occurred."); // Fallback error message
            }
        }
    };

    return (
        <div>
            <AuthForm 
                isLogin={true} 
                onSubmit={handleLogin} 
                errorMessage={loginError || errorMessage} // Pass error message to AuthForm
            />
        </div>
    );
};

export default LoginPage;