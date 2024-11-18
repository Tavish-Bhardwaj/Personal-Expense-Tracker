
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-muted dark:bg-muted text-foreground py-6">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-w-sm w-full px-6 py-8 bg-card dark:bg-card text-foreground dark:text-primary-foreground shadow-lg rounded-lg border border-border dark:border-muted focus:ring-2 focus:ring-primary"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Signup"}
        </h2>

        {/* Name Input - Only visible for Registration */}
        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: isLogin ? false : "Name is required" })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:outline-none"
            />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
          </div>
        )}

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:outline-none"
          />
          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
            })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button
            type="button"
            className="absolute right-3 top-9"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-primary dark:text-primary-foreground" />
            ) : (
              <Eye className="h-5 w-5 text-primary dark:text-primary-foreground" />
            )}
          </button>
          {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg mt-6 shadow hover:bg-primary-foreground hover:text-primary transition disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : isLogin ? "Login" : "Signup"}
        </button>
      </form>
    </div>
  );
};
