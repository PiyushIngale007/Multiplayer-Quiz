import React, { useState, useEffect } from "react";
import PageLayout from "./page-layout";
import Header from "./Header/Header";
import "./Profile.css";
import { Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [followers, setFollowers] = useState(-1);
  const [following, setFollowing] = useState(-1);

  useEffect(async () => {
    const res = await axios.get(
      "http://localhost:5000/api/user/profile/" + user.userID
    );

    setFollowers(res.data.followers);
    setFollowing(res.data.following);
  }, []);

  return (
    <PageLayout>
      <Header pageName="Profile" />
      <div className="profile">
        <div className="profile-container">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="avatar"
            className="avatar"
          />
          <p className="name">{user.name}</p>
          <div className="bio">
            <Button variant="outlined" color="primary" className="btn">
              <PersonIcon style={{ marginInline: "5px" }} />
              {followers} Followers
            </Button>
            <Button variant="outlined" color="primary" className="btn">
              <PersonIcon style={{ marginInline: "5px" }} />
              {following} Following
            </Button>
          </div>
        </div>
        <div className="posts">Hello</div>
      </div>
    </PageLayout>
  );
}
