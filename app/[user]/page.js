"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function User() {
  const { user } = useParams();
  const [guestFlag, setFlag] = useState("");
  const [sessionEmail, setEmail] = useState("");
  // console.log(user);
  const [userData, setUser] = useState({});
  const fetchSinData = async () => {
    const { data, error } = await supabase
      .from("channel")
      .select("*")
      .eq("username", user);

    if (data && data.length > 0) {
      const [obj] = data;
      setUser(obj);
    }
  };

  useEffect(() => {
    const getSessionDet = async () => {
      const { data, error } = await supabase.auth.getSession();
      // console.log(data);
      if (data?.session === null) {
        setFlag(true);
      } else if (data?.session?.user) {
        setEmail(data.session.user.email);
      } else {
        setFlag(false);
      }
    };
    getSessionDet();
    document.title = `${user} - Twitch`;
    fetchSinData();
  }, []);

  // console.log(guestFlag);

  console.log(userData);
  return (
    <div className="mt-6 h-screen mx-6 flex justify-start">
      <div
        style={{ height: "580px", width: "920px" }}
        className="mx-6 rounded-lg shadow-xl flex flex-col justify-between p-3"
      >
        {userData?.is_streaming ? (
          <div className="mb-3">
            <iframe
              height={"500px"}
              width={"900px"}
              className="rounded-lg"
              src="https://www.youtube.com/embed/jfKfPfyJRdk"
            ></iframe>
          </div>
        ) : (
          <div
            style={{
              position: "relative",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className="mb-3 flex justify-center"
          >
            <p className="p-2 text-white flex justify-center font-bold rounded-lg bg-purple-800">
              Offline
            </p>
          </div>
        )}
        <div className="flex flex-col justify-end">
          <div className="flex justify-center items-center">
            {guestFlag ? (
              <Link href={`/login`}>
                <button className="font-bold rounded-lg p-2 bg-purple-800 hover:bg-purple-900 hover:text-white">
                  <p>Follow</p>
                </button>
              </Link>
            ) : userData.email !== sessionEmail ? (
              <button className="font-bold rounded-lg p-2 bg-purple-800 hover:bg-purple-900 hover:text-white">
                <p>Follow</p>
              </button>
            ) : null}
            <button className="font-bold ml-4 rounded-lg p-2 bg-purple-800 hover:bg-purple-900 hover:text-white">
              <Link href={`/`}>Home</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="h-fit rounded-lg p-2 font-bold shadow-lg">Chat Box</div>
    </div>
  );
}
