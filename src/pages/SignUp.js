import React, { useState, useEffect } from "react";
import "./css/LogIn.css";
import boy from "../assets/images/boy.png";

import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../features/user/userSlice";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { Email } from "@material-ui/icons";

const SignUp = () => {
  const dispatch = useDispatch();
  const [signedUp, setsignedUp] = useState(false);
  const user = useSelector((state) => state.user);
  const [Name, setName] = useState("");
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const signUp = () => {
    if (email !== "" && password !== "" && Name !== "" && UserName !== "") {
      setIsSubmitting(true);
      setError("");
      const genericErrorMessage =
        "Something went wrong! Please try again later.";
      let data = {
        username: UserName,
        password: password,
        name: Name,
        email: email,
      };
      axios
        .post("http://localhost:5000/api/user/signup", data, {
          withCredentials: true,
        })
        .then(async (response) => {
          setIsSubmitting(false);
          if (response.status !== 200) {
            if (response.status === 400) {
              setError("Please fill all the fields correctly!");
            } else if (response.status === 401) {
              setError("Invalid email and password combination.");
            } else if (response.status === 500) {
              console.log(response);
              const data = response;
              if (data.message) setError(data.message || genericErrorMessage);
            } else {
              setError(genericErrorMessage);
            }
          } else {
            const { data } = response;

            let data1 = {
              name: UserName,
              token: data.token,
              userDetails: {},
              // email: email,
            };

            dispatch(setUserDetails(data1));

            setsignedUp(true);
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          setError(genericErrorMessage);
        });
    } else {
      alert("Please fill All details");
    }
  };

  if (signedUp) {
    return <Redirect push to="/" />;
  }
  return (
    <div className="authcontainer">
      <div className="modal-dialog text-center">
        <div className="col-sm-8 main-section">
          <div className="modal-content">
            <div className="col-12 user-img">
              <img src={boy} alt="" />
            </div>

            <form className="col-12">
              <div className="form-group">
                <input
                  type="name"
                  id="name"
                  className="form-control"
                  placeholder="Name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  value={Name}
                />
              </div>
              <div className="form-group">
                <input
                  type="Username"
                  id="Username"
                  className="form-control"
                  placeholder="User Name"
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                  value={UserName}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="usr"
                  className="form-control"
                  placeholder="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  value={email}
                />
              </div>
              <div className="form-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="pass"
                  className="form-control"
                  placeholder="Password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  value={password}
                />
              </div>
            </form>
            <button
              onClick={() => signUp()}
              className="btn btn-success btn2"
              disabled={isSubmitting}
            >
              <i className="fas fa-user-plus"></i>Sign up
            </button>
            <p
              style={{
                textAlign: "center",
                fontFamily: "Roboto",
                fontSize: "1.5rem",
                color: "white",
              }}
            >
              OR
            </p>
            <Link to="/login">
              <button className="btn btn-primary btn1">
                <i className="fas fa-sign-in-alt"></i> Login
              </button>
            </Link>
            <div className="col-12 forget"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
