"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client.js";

export default function Login() {
  const handleGoogleLogin = () => {
    const { user, error } = supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (user) {
      console.log(user);
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <div className="h-screen bg-gray-400 flex justify-center items-center">
      <div className="h-1/4 w-1/4 bg-sky-300 shadow-lg relative bottom-24">
        <div className="flex justify-center mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.8em"
            height="2.8em"
            viewBox="0 0 24 24"
            className="text-purple-800"
          >
            <path
              fill="currentColor"
              d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
            />
          </svg>
          <p className="mt-1 font-bold ml-2 text-xl">Log in to Twitch</p>
        </div>
        <div
          onClick={handleGoogleLogin}
          className="flex cursor-pointer hover:bg-purple-900 hover:text-white justify-center items-center relative top-16 mx-10 p-2 rounded-lg font-bold bg-purple-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 48 48"
            className="mr-2"
          >
            <path
              fill="#ffc107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
            />
            <path
              fill="#ff3d00"
              d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
            />
            <path
              fill="#4caf50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
            />
            <path
              fill="#1976d2"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
            />
          </svg>
          <p>Log in With Google</p>
        </div>
      </div>
    </div>
  );
}
