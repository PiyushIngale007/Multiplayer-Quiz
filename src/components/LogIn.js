import React from "react";
import "./LogIn.css";
import boy from "./images/boy.png";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../features/user/userSlice";
import firebase from "./firebase";
const LogIn = () => {
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const [loggedIn, setloggedIn] = React.useState(false);

  const login = () => {
    const email = document.getElementById("usr").value;
    const password = document.getElementById("pass").value;

    if (email != "" && password != "") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user.displayName);
          setTimeout(() => {
            let data = {
              name: user.displayName,
              user_id: user.uid,
              email: user.email,
            };

            dispatch(setUserDetails(data));
            setloggedIn(true);
          }, 1000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          console.log(errorMessage);
        });
    } else {
      alert("Please fill All details");
    }
  };
  const Reset_Email = () => {
    const email = document.getElementById("usr").value;
    if (email != "") {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function () {
          console.log("Email sent.");
          alert("Please Check Your Mail to reset the password.");
        })
        .catch(function (error) {
          // An error happened.
          console.log(error);
        });
    } else {
      alert("Please Enter your Email Id.");
    }
  };
  if (loggedIn) {
    return <Redirect push to="/home" />;
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
                  type="email"
                  id="usr"
                  className="form-control"
                  placeholder="Email Id"
                />
              </div>
              <div className="form-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="pass"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
            </form>
            <button
              onClick={() => login()}
              type="submit"
              className="btn btn-primary btn1"
            >
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
            <button
              onClick="location.href='signUp.html'"
              className="btn btn-success btn2"
            >
              <i className="fas fa-user-plus"></i>Sign up
            </button>

            <div className="col-12 forget"></div>
            <a href="#" className="area" onClick={() => Reset_Email()}>
              Forgot Password ?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
