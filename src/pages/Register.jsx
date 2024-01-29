import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthWrapper } from "@/components/app";
import { cn } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/auth";
import { useSignupMutation } from "@/redux/services/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [signup, { error }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  async function onSubmit(data) {
    const response = await signup(data);
    localStorage.setItem("token", response.data.accessToken);
    navigate("/books");
  }

  return (
    <AuthWrapper mode="register">
      <div className={cn("grid gap-6")}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-[20px]">
            <div className="grid gap-2">
              <Label htmlFor="firstName">
                First Name<span className="asterisk">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="First name"
                disabled={isLoading}
                {...register("firstName", { required: true, maxLength: 15 })}
              />
              {errors.firstName && (
                <p className="error">
                  Please enter last name with maximum 15 characters.
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">
                Last Name<span className="asterisk">*</span>
              </Label>
              <Input
                id="lastName"
                placeholder="Last name"
                disabled={isLoading}
                {...register("lastName", { required: true, maxLength: 15 })}
              />
              {errors.lastName && (
                <p className="error">
                  Please enter first name with maximum 15 characters.
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email<span className="asterisk">*</span>
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="error">Please enter valid email.</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">
                Password<span className="asterisk">*</span>
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                disabled={isLoading}
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password && (
                <p className="error">
                  Please enter password with minimum 8 characters.
                </p>
              )}
            </div>
            <Button disabled={isLoading}>
              {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
              Register
            </Button>
          </div>
        </form>
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaGithub className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button> */}
      </div>
    </AuthWrapper>
  );
};

export { Register };
