"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function ChannelComp() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [flag, setFlag] = useState(false);

  const fetchSinData = async () => {
    const { data, error } = await supabase
      .from("channel")
      .select("*")
      .eq("channel_id", id);

    if (data && data.length > 0) {
      const [obj] = data;
      setUser(obj);
      setFlag(obj.is_streaming);
    } else {
      console.log("Error in fetching data");
    }
  };

  const handleClick = async (e) => {
    const { error } = await supabase
      .from("channel")
      .upsert({ channel_id: id, is_streaming: !flag })
      .select();

    if (!error) {
      console.log("Data updated successfully");
      setFlag(!flag);
      setUser((prevState) => ({
        ...prevState,
        is_streaming: !flag,
      })); // Updating the user state as well so that the component re-renders with the new updated state
    }

    console.log(e.target.innerText);
    if (e.target.innerText === "Start Streaming") {
      const { data, error } = await supabase.rpc("get_channel_emails", {
        channel_id: id,
      });
      if (data) {
        const emails = data.map((det) => {
          return det.email;
        });
        console.log(emails);
        const response = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_ids: emails,
            username: user.username,
            userEmail: user.email,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
        }
      } else if (error) {
        console.log("Error in fetching emails");
      }
    }
  };

  useEffect(() => {
    document.title = "Streaming Details";
    fetchSinData();
  }, []);

  return (
    <div className="mt-16 bg-sky-400 shadow-lg mx-6 rounded-lg">
      <div className="flex justify-center items-center">
        {user?.is_streaming ? (
          <div className="h-96 w-full mb-3">
            <iframe
              className="h-96 w-full rounded-lg"
              src="https://www.youtube.com/embed/jfKfPfyJRdk"
            ></iframe>
          </div>
        ) : (
          <div className="h-96 w-full mb-3 flex justify-center items-center">
            <p className="p-2 text-white font-bold rounded-lg bg-purple-800 flex justify-center items-center">
              Offline
            </p>
          </div>
        )}
      </div>
      <hr />
      <div className="w-full my-2 flex justify-center">
        <div className="my-2">
          {flag ? (
            <button
              onClick={handleClick}
              className="p-2 hover:text-white hover:bg-red-900 mr-3 font-bold bg-red-800 rounded-lg"
            >
              Stop Streaming
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="p-2 hover:text-white hover:bg-purple-900 mr-3 font-bold bg-purple-800 rounded-lg"
            >
              Start Streaming
            </button>
          )}
          <Link href={`/`}>
            <button className="p-2 hover:text-white hover:bg-purple-900 font-bold bg-purple-800 rounded-lg">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
