"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

const Page = () => {
  const router = useRouter();

  const { googleSignIn, logOut, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/conversations");
    }
  }, [isAuthenticated, router]);

  const handleSignInWithGoogle = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
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
          className="mb-[72px] flex"
        />
        <div className=" mb-8 flex flex-col items-center font-medium">
          <h1 className="pb-4 text-[61px] text-ttwilight-navy">
            <span className="text-primary italic">Welcome</span> to Raz
          </h1>
          <p className="w-10/12 text-center text-grey-subtext font-normal text-base">
            Get the full value of your lead flow with Raz&apos;s lead engagement
            platform.
          </p>
        </div>
        <div>
          <button
            className="flex gap-4 bg-white px-[107px] py-2 font-semibold"
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
          <button onClick={logOut}>Log Out</button>

          {/* <h1>Welcome {user}</h1> */}
          <div className="my-8 w-full border"></div>
          <form className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 text-left text-sm leading-[21px]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              className="mb-6 h-10 rounded-lg border p-3 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="h-10 w-full rounded-lg bg-ttwilight-navy font-semibold text-white leading-[19.2px]">
              Continue with email
            </button>
          </form>
        </div>
      </div>
      <div>
        <p className="w-[416px] text-sm text-grey-subtext font-normal leading-[21px]">
          By clicking &quot;Continue with Google&quot; or &quot;Continue with
          Apple&quot; you agree with our{" "}
          <Link href={"#"} className="underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href={"#"} className="underline">
            Terms of Use
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Page;
