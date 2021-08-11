import React from 'react';
import './LogIn.css';
import boy from './images/boy.png';
const LogIn = () => {
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
                type='email'
                id='usr'
                className='form-control'
                placeholder='Email Id'
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
          <button
            onClick='login()'
            type='submit'
            className='btn btn-primary btn1'
          >
            <i className='fas fa-sign-in-alt'></i> Login
          </button>
          <button
            onClick="location.href='signUp.html'"
            className='btn btn-success btn2'
          >
            <i className='fas fa-user-plus'></i>Sign up
          </button>

          <div className='col-12 forget'></div>
          <a href='#' className='area' onClick='Reset_Email()'>
            Forgot Password ?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
