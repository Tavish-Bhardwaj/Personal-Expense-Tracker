
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type AuthFormProps = {
    isLogin: boolean;
    onSubmit: (data: AuthInputs) => Promise<void>;
};

type AuthInputs = {
    name?: string;
    email: string;
    password: string;
};

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSubmit }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthInputs>();
    const [showPassword, setShowPassword] = useState(false);

    const handleFormSubmit: SubmitHandler<AuthInputs> = async (data) => {

        if (!isLogin && !data.name) {
            throw new Error("Name is required for registration");
        }
        await onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-md mx-auto p-6 bg-card dark:bg-card-foreground shadow-lg rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-foreground dark:text-primary-foreground">{isLogin ? 'Login' : 'Register'}</h2>
            
            {/* Name Input - Only visible for Registration */}
            {!isLogin && (
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-muted dark:text-muted-foreground">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        {...register('name', { required: isLogin ? false : 'Name is required' })}
                        className="w-full mt-2 p-3 rounded-md border border-border dark:border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                </div>
            )}

            {/* Email Input */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-muted dark:text-muted-foreground">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full mt-2 p-3 rounded-md border border-border dark:border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm font-medium text-muted dark:text-muted-foreground">Password</label>
                <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    })}
                    className="w-full mt-2 p-3 rounded-md border border-border dark:border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    type="button"
                    className="absolute right-3 top-9 text-muted dark:text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? 'Hide' : 'Show'}
                </button>
                {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-primary text-primary-foreground p-3 rounded-md mt-4 hover:bg-primary-foreground dark:hover:bg-primary"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Processing...' : isLogin ? 'Login' : 'Register'}
            </button>
        </form>
    );
};