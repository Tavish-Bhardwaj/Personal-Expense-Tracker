"use client"
import { useAuth } from "@/app/contexts/AuthContext";
import { AuthForm } from "@/app/components/AuthForm";
import { useRouter } from "next/navigation";

const RegisterPage : React.FC = () => {
    const {registerUser} = useAuth();
    const  router = useRouter();


    const handleRegister = async(data:{name?: string, email: string, password: string})=>{
        try{
            await registerUser(data);
            router.push('/auth/login');
        }catch(error){
            console.error("Registration Failed", error);
        }
    };
    return <AuthForm isLogin= {false} onSubmit ={handleRegister}/>
}

export default RegisterPage;



