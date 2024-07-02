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
      setFlag(obj.is_streaming); // Correctly setting the flag based on fetched data
    } else {
      console.log("Error in fetching data");
    }
  };

  const handleClick = async () => {
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
