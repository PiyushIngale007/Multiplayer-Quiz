import React, { useState } from "react";
import "./css/LogIn.css";
import boy from "../assets/images/boy.png";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../features/user/userSlice";
import axios from "axios";

const LogIn = () => {
  const dispatch = useDispatch();
  const [loggedIn, setloggedIn] = React.useState(false);
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();

    if (password !== "" && UserName !== "") {
      setIsSubmitting(true);
      setError("");
      const genericErrorMessage =
        "Something went wrong! Please try again later.";
      let data = {
        username: UserName,
        password: password,
      };
      axios
        .post("http://localhost:5000/api/user/login", data, {
          withCredentials: true,
        })
        .then(async (response) => {
          setIsSubmitting(false);
          if (response.status !== 200) {
            if (response.status === 400) {
              setError("Please fill all the fields correctly!");
            } else if (response.status === 401) {
              setError("Invalid email and password combination.");
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

            setloggedIn(true);
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

  if (loggedIn) {
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

            <form onSubmit={login} className="col-12">
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
              <button
                className="btn btn-success btn2"
                disabled={isSubmitting}
                type="submit"
              >
                <i className="fas fa-user-plus"></i>Log In
              </button>
            </form>

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
            <Link to="/signup">
              <button className="btn btn-success btn2">
                <i className="fas fa-user-plus"></i>Sign up
              </button>
            </Link>
            <div className="col-12 forget"></div>
            <a href="/login" className="area">
              Forgot Password ?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
