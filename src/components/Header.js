import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import StickyBox from "react-sticky-box/dist/esnext";
import { setUserDetails } from "../features/user/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.user);

  const [userData, setuserData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    setuserData(user.userDetails);
  }, [user.userDetails]);

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    fetch("http://localhost:5000/api/user/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then(async (response) => {
      let data1 = {
        name: "",
        token: "",
        // email: email,
      };

      dispatch(setUserDetails(data1));

      window.localStorage.setItem("logout", Date.now());
    });
  };

  return (
    <StickyBox>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {props.pageName}
          </Typography>
          <Button color="inherit">Quiz</Button>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <div style={{ width: "40px" }}>
                <img src={userData.svgAvatar}></img>
              </div>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
                <Link to="/profile">Profile </Link>
              </MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>
                <Link to="/login">
                  <p onClick={signOut}>Sign out</p>
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </StickyBox>
  );
};

export default Header;
