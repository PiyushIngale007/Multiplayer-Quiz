import React from "react";
import PageLayout from "./page-layout";
import Header from "./Header/Header";
import "./Profile.css";
import { Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
export default function Profile() {
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
          <p className="name">Username</p>
          <div className="bio">
            <Button variant="outlined" color="primary" className="btn">
              <PersonIcon style={{ marginInline: "5px" }} />
              Followers
            </Button>
            <Button variant="outlined" color="primary" className="btn">
              <PersonIcon style={{ marginInline: "5px" }} />
              Following
            </Button>
          </div>
        </div>
        <div className="posts">Hello</div>
      </div>
    </PageLayout>
  );
}
