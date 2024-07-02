"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";

function ProfileComponent() {
  const userRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [userDet, setUser] = useState({
    username: "",
    email: email || "",
    bio: "",
    flag: false,
  });
  // console.log(email);
  const handleChange = (e) => {
    setUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("channel").insert({
      username: userDet.username,
      email: userDet.email,
      bio: userDet.bio,
      is_notify: userDet.flag,
    });

    if (!error) {
      router.push("/");
    } else {
      alert("Error in inserting data");
    }
  };

  useEffect(() => {
    userRef.current.focus();
    document.title = "Profile Settings";
  }, []);
  return (
    <div className="h-screen bg-gray-400 flex justify-center items-center">
      {/* <p>{JSON.stringify(userDet)}</p> */}
      <div className="h-4/6 w-1/3 bg-sky-300 shadow-lg relative bottom-10">
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
          <p className="mt-1 font-bold ml-2 text-xl">Set up your Profile</p>
        </div>
        <form onSubmit={handleClick} className="relative top-6">
          <div className="flex justify-center items-center">
            <label className="font-bold mr-2">Username</label>
            <input
              onChange={handleChange}
              name="username"
              ref={userRef}
              type="text"
              required
              className="p-1 bg-gray-400 w-52"
            />
          </div>
          <div className="flex justify-center items-center mt-6">
            <label className="font-bold mr-2">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={userDet.email}
              required
              className="p-1 bg-gray-400 w-52"
            />
          </div>
          <div className="flex justify-center items-center mt-6">
            <label className="font-bold mr-2">Bio</label>
            <textarea
              onChange={handleChange}
              rows="5"
              name="bio"
              cols="14"
              type="text"
              required
              className="p-1 bg-gray-400 w-52"
            />
          </div>
          <div className="flex justify-center items-center mt-6">
            <input
              onChange={handleChange}
              type="checkbox"
              className="mr-2"
              name="flag"
            />
            <label className="font-bold">Click here to push notification</label>
          </div>
          <div className="flex justify-center items-center mt-6 hover:text-white">
            <button className="font-bold w-full bg-purple-800 p-2 mx-14 rounded-lg hover:bg-purple-900">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileComponent />
    </Suspense>
  );
}
