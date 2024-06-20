"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import SignInSchema from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Page = () => {
  const router = useRouter();
  const { googleSignIn, emailSignIn, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/conversations");
    }
  }, [isAuthenticated, router]);

  const handleSignInWithGoogle = async () => {
    try {
      await googleSignIn(rememberMe);
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof SignInSchema>) => {
    setIsSubmitting(true);
    try {
      await emailSignIn(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center bg-whispering-white text-center py-10 justify-between">
      <div className="flex flex-col items-center">
        <Image
          src={"/assets/icons/logo.svg"}
          alt="logo"
          width={73}
          height={24}
          className="mb-10 flex"
        />
        <div className="bg-white p-12 border rounded-2xl border-grey-neutral">
          <div className=" mb-8 flex flex-col items-center font-medium">
            <h1 className="mb-2 text-[61px] text-ttwilight-navy">
              <span className="text-primary italic welcomeTitle">Welcome</span>{" "}
              back
            </h1>
            <span className="text-center text-grey-subtext font-normal text-base font-AeonikProLight">
              Sign in with Google or enter your email and password.
            </span>
          </div>
          <div>
            <button
              className="flex gap-4 bg-white px-[107px] py-2 font-medium border rounded-lg border-grey-neutral"
              onClick={handleSignInWithGoogle}
            >
              <Image
                src={"/assets/icons/google.svg"}
                alt="Google icon"
                width={24}
                height={24}
              ></Image>
              Continue with Google
            </button>
            <div className="flex items-center">
              <div className=" w-full border-t border-grey-neutral"></div>
              <p className="mx-2 text-grey-subtext my-4">OR</p>
              <div className=" w-full border-t border-grey-neutral"></div>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col text-left mb-4">
                      <FormLabel className="text-left text-sm leading-sm text-ttwilight-navy font-normal">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="mb-4 h-10 rounded-lg border px-4 py-2 focus:outline-none placeholder:text-grey-subtext"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col text-left mb-2">
                      <FormLabel className="text-left text-sm leading-sm text-ttwilight-navy font-normal">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="h-10 w-full rounded-lg border focus:outline-none placeholder:text-grey-subtext"
                          />
                          <div
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          >
                            {showPassword ? (
                              <Image
                                src={"/assets/icons/eyeOpen.svg"}
                                alt="Open eye"
                                width={24}
                                height={24}
                              />
                            ) : (
                              <Image
                                src={"/assets/icons/eyeClosed.svg"}
                                alt="Closed eye"
                                width={24}
                                height={24}
                              />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              className="text-white focus:primary focus:ring-primary active:bg-primary border-grey-neutral"
                              id="rememberMe"
                              name="rememberMe"
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                setRememberMe(Boolean(checked));
                              }}
                            />
                          </FormControl>
                          <label
                            htmlFor="rememberMe"
                            className="text-sm leading-sm"
                          >
                            Remember me
                          </label>
                        </div>
                        <div>
                          <Link
                            href="#"
                            className="underline text-sm leading-sm font-normal"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="h-10 w-full rounded-lg bg-ttwilight-navy font-medium text-white mb-4 text-base leading-[19.2px]"
                  disabled={isSubmitting}
                >
                  Sign in
                </Button>
              </form>
            </Form>

            <div className="font-medium text-sm leading-sm">
              <span>Not a member? </span>
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
