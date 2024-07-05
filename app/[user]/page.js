"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState, useCallback } from "react";

export default function User() {
  const { user } = useParams();
  const [guestFlag, setFlag] = useState(false);
  const [sessionEmail, setEmail] = useState("");
  const [userData, setUser] = useState({});
  const [comm, setComm] = useState({
    comments: "",
  });
  const [chatData, setChatData] = useState([]);
  const [msgFlag, setMsgFlag] = useState(false);

  const fetchSinData = async () => {
    const { data, error } = await supabase
      .from("channel")
      .select("*")
      .eq("username", user);

    if (data && data.length > 0) {
      const [obj] = data;
      setUser(obj);
    } else if (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  const handleClick = async () => {
    const { data, error } = await supabase
      .from("channel")
      .select("channel_id")
      .eq("email", sessionEmail);

    if (data && data.length > 0) {
      const [obj] = data;
      const sessionChannelId = obj.channel_id;

      const { insertError } = await supabase.from("follower").insert({
        channel_id: userData.channel_id,
        follower_id: sessionChannelId,
      });

      if (!insertError) {
        alert("Yipee!! You are now following this channel!!");
      } else {
        alert("Cannot insert follower");
      }
    } else if (error) {
      console.log("Error in fetching channel_id");
    }
  };

  const getSessionDet = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data?.session === null) {
      setFlag(true);
    } else if (data?.session?.user) {
      setEmail(data.session.user.email);
    } else {
      setFlag(false);
    }
  }, []);

  const handleChange = (e) => {
    setComm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSend = async () => {
    // console.log(comm.comments);
    const { data, error } = await supabase
      .from("channel")
      .select("username")
      .eq("email", sessionEmail);

    if (data && data.length > 0) {
      const [obj] = data;
      const sessionUsername = obj.username;

      // console.log(sessionUsername);

      const { error: insertError } = await supabase.from("chat").insert({
        channel_id: userData.channel_id,
        username: sessionUsername,
        comments: comm.comments,
      });

      if (!insertError) {
        console.log("Data inserted inside chat table");
      } else {
        console.log("Error in inserting data");
      }
    } else if (error) {
      console.log("Error in fetching session username");
    }

    setMsgFlag(!msgFlag);

    setComm((prevState) => {
      return {
        ...prevState,
        comments: "",
      };
    });
  };

  const fetchChatData = async () => {
    const { data, error } = await supabase
      .from("chat")
      .select("*")
      .eq("channel_id", userData.channel_id);

    if (data && data.length > 0) {
      setChatData(data);
    } else if (error) {
      console.log("Error in fetching chat data");
    }
  };

  useEffect(() => {
    getSessionDet();
    document.title = `${user} - Twitch`;
    fetchSinData();
  }, []);

  useEffect(() => {
    if (userData.channel_id) {
      fetchChatData();
    }
  }, [userData, msgFlag]);

  console.log(chatData);

  return (
    <div className="mt-6 h-screen mx-6 flex justify-start">
      {/* {JSON.stringify(chatData)} */}
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
              <button
                onClick={handleClick}
                className="font-bold rounded-lg p-2 bg-purple-800 hover:bg-purple-900 hover:text-white"
              >
                <p>Follow</p>
              </button>
            ) : null}
            <button className="font-bold ml-4 rounded-lg p-2 bg-purple-800 hover:bg-purple-900 hover:text-white">
              <Link href={`/`}>Home</Link>
            </button>
          </div>
        </div>
      </div>
      <div
        style={{ height: "580px", width: "400px" }}
        className="rounded-lg p-2 shadow-lg"
      >
        <div
          style={{ height: "500px", width: "384px" }}
          className="bg-gray-200 px-2 py-4 flex items-end"
        >
          <div className="">
            {chatData && chatData.length > 0
              ? chatData.map((sinChat) => {
                  return (
                    <div key={sinChat.id} className="flex mt-2">
                      <div className="font-bold text-purple-800">
                        <p>{sinChat.username}:&nbsp;&nbsp;</p>
                      </div>
                      <div className="text-left">
                        <p>{sinChat.comments}</p>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        {guestFlag ? (
          <Link href={`/login`}>
            <div
              style={{ height: "40px", width: "384px" }}
              className="mt-4 flex justify-center items-center cursor-pointer hover:bg-purple-900 hover:text-white bg-purple-800 rounded-lg"
            >
              <p className="font-bold">Log In to start chatting</p>
            </div>
          </Link>
        ) : userData.is_streaming ? (
          <div className="mt-4 flex justify-evenly">
            <input
              onChange={handleChange}
              style={{ height: "40px", width: "330px" }}
              type="text"
              name="comments"
              value={comm.comments}
              placeholder="Send Message"
              className="w-full p-2 bg-gray-200 rounded-lg"
            />
            <div
              onClick={handleSend}
              style={{ height: "40px", width: "40px" }}
              className="bg-gray-200 flex justify-center items-center rounded-lg cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.8em"
                height="1.8em"
                viewBox="0 0 24 24"
                className="text-purple-800"
              >
                <path
                  fill="currentColor"
                  d="m4.497 20.835l16.51-7.363c1.324-.59 1.324-2.354 0-2.944L4.497 3.164c-1.495-.667-3.047.814-2.306 2.202l3.152 5.904c.245.459.245 1 0 1.458l-3.152 5.904c-.74 1.388.81 2.87 2.306 2.202"
                />
              </svg>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
