import React, { useState, useEffect } from 'react';
import './LogIn.css';
import boy from './images/boy.png';
import firebase from './firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../features/user/userSlice';
import { Redirect } from 'react-router-dom';

const SignUp = () => {
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const [signedUp, setsignedUp] = useState(false);

  const signUp = () => {
    const email = document.getElementById('usr').value;
    const password = document.getElementById('pass').value;
    const name = document.getElementById('name').value;

    if (email != '' && password != '' && name != '') {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          user.updateProfile({
            displayName: name,
          });

          setTimeout(() => {
            let data = {
              name: user.displayName,
              user_id: user.uid,
              email: user.email,
            };

            dispatch(setUserDetails(data));
            setsignedUp(true);
          }, 1000);

          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);

          // ..
        });
    } else {
      alert('Please fill All details');
    }
  };

  if (signedUp) {
    return <Redirect push to='/home' />;
  }
  return (
    <div className='modal-dialog text-center'>
      <div className='col-sm-8 main-section'>
        <div className='modal-content'>
          <div className='col-12 user-img'>
            <img src={boy} alt='' />
          </div>

          <form className='col-12'>
            <div className='form-group'>
              <input
                type='name'
                id='name'
                className='form-control'
                placeholder='Name'
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                id='usr'
                className='form-control'
                placeholder='Email'
              />
            </div>
            <div className='form-group'>
              <i className='fas fa-lock'></i>
              <input
                type='password'
                id='pass'
                className='form-control'
                placeholder='Password'
              />
            </div>
          </form>
          <button onClick={() => signUp()} className='btn btn-success btn2'>
            <i className='fas fa-user-plus'></i>Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;