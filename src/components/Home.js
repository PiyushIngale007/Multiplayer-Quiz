import React, { useEffect } from "react";
import PageLayout from "./page-layout";
import Header from "./Header/Header";
import socket from "./socketio";

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
