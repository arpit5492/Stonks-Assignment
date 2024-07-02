"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function NavBar() {
  const [userDet, setUser] = useState(null);
  const [apiData, setData] = useState({});
  const fetchSinData = async (email) => {
    const { data, error } = await supabase
      .from("channel")
      .select("*")
      .eq("email", email);
    // console.log(data);
    if (data) {
      const [obj] = data;
      setData(obj);
    } else if (error) {
      console.log("Error in fetching data");
    }
  };
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      // console.log(data?.session?.user);
      if (data?.session?.user) {
        setUser(data.session.user);
        fetchSinData(data.session.user.email);
      } else {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  // console.log(apiData);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
    }
  };
  return (
    <div className="w-full bg-sky-300 shadow-lg h-14 flex justify-between items-center">
      <Link href={`/`}>
        <div className="ml-4 text-purple-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.2em"
            height="2.2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
            />
          </svg>
        </div>
      </Link>
      <div className="flex justify-evenly">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-500 p-2 mr-3"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
          className="mt-1 cursor-pointer"
        >
          <path
            fill="currentColor"
            d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
          />
        </svg>
      </div>
      {userDet ? (
        <div className="flex items-center mr-10">
          {apiData?.is_notify ? (
            <Link href={`/channel/${apiData.channel_id}`}>
              <div className="bg-purple-800 hover:text-white hover:bg-purple-900 py-2 px-3 rounded-lg mr-4">
                <button className="font-bold">Channel</button>
              </div>
            </Link>
          ) : (
            <></>
          )}
          <Link href={`/profile/?email=${userDet.email}`}>
            <div className="bg-purple-800 hover:text-white hover:bg-purple-900 py-2 px-3 rounded-lg mr-4">
              <button className="font-bold">Profile</button>
            </div>
          </Link>
          <div
            onClick={handleSignOut}
            className="bg-red-600 cursor-pointer hover:text-white hover:bg-red-800 py-2 px-3 rounded-lg"
          >
            <button className="font-bold">Sign Out</button>
          </div>
        </div>
      ) : (
        <Link href={`/login`}>
          <div className="bg-purple-700 hover:text-white hover:bg-purple-800 py-2 px-3 rounded-lg mr-10">
            <button className="font-bold">Login</button>
          </div>
        </Link>
      )}
    </div>
  );
}
