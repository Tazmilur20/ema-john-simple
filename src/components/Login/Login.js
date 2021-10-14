
import React, { useContext, useState } from 'react';
import LoginManager from './Login'

import 'firebase/auth';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework } from './LoginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  initializeLoginFramework()

  const [loggedInUser, setLoggedInUser]=useContext(UserContext)
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const GoogleSignIn=()=>{
    handleGoogleSignIn()
    .then(res=>{
      setUser(res)
      setLoggedInUser(res) 
      history.replace(from);
    })
  }
  const FbSignIn=()=>{
    handleFbSignIn() 
    .then(res=>{
      setUser(res)
      setLoggedInUser(res) 
      history.replace(from);
    })
  }

  const SignOut = ()=>{

    handleSignOut()
    .then(res=>{
      setUser(res)
      setLoggedInUser(res)
    })
  }


  const handleBlur = (event) => {
    // console.log(event.target.name, event.target.value)
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)

    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = (isPasswordValid && passwordHasNumber)
    }
    // if(event.target.name==='name'){
    //   isFormValid=true;
    // }

    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }

  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
       // createUserWithEmailAndPassword()

    }
    if (!newUser && user.email && user.password) {
   

    }

    e.preventDefault();

  }



  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={SignOut}>Sign Out</button> :
          <button onClick={GoogleSignIn}>Sign In</button>
      }
      <br />
      <button onClick={FbSignIn}>Sign In Using Facebook</button>
      {
        user.isSignedIn && <div>
          <p> Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>

        </div>
      }

      <h1>Our Authentication</h1>
      {/* <p>name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>

        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="your name" />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="your email address" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="your password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>user {newUser ? 'created' : 'Login'} successfully</p>}

    </div>
  );
}

export default Login;
