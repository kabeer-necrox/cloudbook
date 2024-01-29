import React, { useState } from "react";
import { DashboardWrapper } from "@/components/app";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ManageAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data) {
    console.log(data);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <DashboardWrapper tab="manageAccount">
      <div className="flex flex-col gap-8 p-8 w-full max-w-[600px]">
        <h2 className="text-xl font-bold">Manage Account</h2>
        <div className={cn("grid gap-6")}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-[20px]">
              <div className="grid gap-2">
                <Label className="" htmlFor="firstName">
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
                <Label className="" htmlFor="lastName">
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
              <Button disabled={isLoading}>
                {isLoading && (
                  <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export { ManageAccount };
