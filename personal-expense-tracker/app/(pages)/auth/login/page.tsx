"use client"
import { useAuth } from "@/app/contexts/AuthContext";
import { AuthForm } from "@/app/components/AuthForm";
import { useRouter } from "next/navigation";


const LoginPage : React.FC =()=>{
    const {login} = useAuth();
    const router = useRouter();

    const handleLogin = async( data:{email: string, password: string})=>{
        try{
            const {email, password} = data;
            await login(email,password);
            router.push("/dashboard");
        }catch(error){
            console.error('Login failed', error);
        }
    };

    return <AuthForm isLogin = {true} onSubmit={handleLogin} />
}
 export default LoginPage;