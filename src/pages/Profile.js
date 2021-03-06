import React, { useState, useEffect } from "react";
import PageLayout from "../components/page-layout";
import Header from "../components/Header";
import "./css/Profile.css";
import { Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [userData, setuserData] = useState({});

  useEffect(() => {
    setuserData(user.userDetails);
  }, [user.userDetails]);

  return (
    <PageLayout>
      <Header pageName="Profile" />
      <div className="profile">
        <div className="profile-container">
          <div className="avatar">
            <img src={userData.svgAvatar}></img>
          </div>

          <p className="name">{user.name}</p>
          <div className="bio">
            <Button variant="outlined" color="primary" className="btn">
              <PersonIcon style={{ marginInline: "5px" }} />
              {userData.followers} Followers
            </Button>
            <Button variant="outlined" color="primary" className="btn">
              <PersonIcon style={{ marginInline: "5px" }} />
              {userData.following} Following
            </Button>
          </div>
        </div>
        <div className="posts">Hello</div>
      </div>
    </PageLayout>
  );
}
