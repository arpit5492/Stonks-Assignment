"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function HomeComp() {
  const [userData, setData] = useState([]);
  const fetchData = async () => {
    const { data, error } = await supabase.from("channel").select("*");
    if (data) {
      const asc = data.sort((a, b) => {
        if (a.channel_id > b.channel_id) {
          return 1;
        } else if (a.channel_id < b.channel_id) {
          return -1;
        } else {
          return 0;
        }
      });
      setData(asc);
    } else {
      console.log("Error fetching data");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // console.log(userData);
  if (userData.length > 0) {
    return (
      <div className="mt-16 mx-10 flex justify-start flex-wrap">
        {userData.map((user) => {
          return (
            <div
              key={user.channel_id}
              className="shadow-lg bg-sky-300 mr-8 mb-8 hover:cursor-pointer hover:opacity-80"
            >
              <div className="w-96 h-72">
                {user.is_streaming ? (
                  <p className="p-2 font-bold rounded-lg text-white flex justify-center items-center mt-2 bg-red-700 w-20 mx-2">
                    LIVE
                  </p>
                ) : (
                  <p className="p-2 font-bold rounded-lg text-white flex justify-center items-center mt-2 bg-purple-800 w-20 mx-2">
                    Offline
                  </p>
                )}
              </div>
              <hr className="bg-black" />
              <div className="font-bold mt-2 mx-2 text-purple-800 cursor-pointer">
                {user.bio}
              </div>
              <div className="font-semibold ml-2 text-gray-700 my-2">
                {user.username}
              </div>
              <div className="font-bold ml-2 text-gray-700 my-2">
                {user.email}
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center mt-16 text-purple-800 text-xl font-bold">
        **No Channel to Display**
      </div>
    );
  }
}
