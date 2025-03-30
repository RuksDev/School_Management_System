"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {

      const { isSignedIn, user, isLoaded } = useUser();

      const router = useRouter();

      useEffect(() => {
        const role = user?.publicMetadata.role;
        if(role){
            router.push(`/${role}`); 
        }
      },[user, router])

  return (
    <div className="h-screen flex items-center justify-center bg-ruksSkyBlueLight">
      <Head>
        <Link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white flex flex-col rounded-md p-12 shadow-2xl gap-2"
        >
          <h1 className="text-xl font-bold flex items-center gap-2 font-open-sans animate-fadeIn">
            <Image src="/logo.png" alt="" width={24} height={24} />
            Blue Sky International School
          </h1>
          <h2 className="text-gray-400 ">Sign-in to your account</h2>

          <Clerk.GlobalError className="text-sm text-red-500" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-sm text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-blue-300 focus:ring-[#0077c0] focus:ring-2 focus:outline-none"
            ></Clerk.Input>
            <Clerk.FieldError className="text-xs text-red-400 animate-errorFade" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-sm text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-blue-300 focus:ring-[#0077c0] focus:ring-2 focus:outline-none"
            ></Clerk.Input>
            <Clerk.FieldError className= "text-xs text-red-400 animate-errorFade" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="text-sm mt-2 p-3 bg-blue-500 my-1 text-white rounded-md hover:bg-blue-600"
          >
            Sign in
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
