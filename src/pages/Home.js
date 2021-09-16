import React, { useEffect } from "react";
import PageLayout from "../components/page-layout";
import Header from "../components/Header";
import socket from "../utils/socketio";

const Home = () => {
  useEffect(() => {
    socket.emit("join", "Heloooooooooooooooo");
    socket.on("onlineUsers", (onlineusers) => {
      console.log(onlineusers);
    });
    socket.on("newUserDisconnected", (onlineusers) => {
      console.log(onlineusers);
    });
  }, []);
  return (
    <PageLayout>
      <Header pageName="Home" />
    </PageLayout>
  );
};

export default Home;
