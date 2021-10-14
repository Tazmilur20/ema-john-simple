import React,{Component} from 'react';
import * as firebase from 'firebase/app';
import {
    GoogleAuthProvider, getAuth, signInWithPopup, signOut, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, updateProfile,FacebookAuthProvider
  } from "firebase/auth";
  import firebaseConfig from './firebase.config';

  export const initializeLoginFramework = () => {
    firebase.initializeApp(firebaseConfig);
  }
  export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
   return signInWithPopup(auth, provider)
      .then(res => {
        const { displayName, photoUrl, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoUrl,
          success: true,
        }
        return signedInUser
        console.log(displayName, photoUrl, email);
      })
      .catch(err => {
        console.log(err)
        console.log(err.message)
      })
  }
  export const handleFbSignIn=() => {
    const fbprovider = new FacebookAuthProvider();

              const auth = getAuth();
          return signInWithPopup(auth, fbprovider)
            .then((result) => {
              // The signed-in user info.
              const user = result.user;
              user.success= true;
              return user;

              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              // const credential = FacebookAuthProvider.credentialFromResult(result);
              // const accessToken = credential.accessToken;
             // console.log("fb user",user)

              // ...
            })
            .catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.email;
              // The AuthCredential type that was used.
              const credential = FacebookAuthProvider.credentialFromError(error);
              //console.log(credential)

              // ...
            });
  }
  export const handleSignOut = () => {
    const auth = getAuth();

   return signOut(auth).then(res => {
      //  const {displayName,photoUrl,email}=res.user;
      const signedOutUser = {
        isSignedIn: false,
        newUser: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
      }
      return signedOutUser
      // console.log(displayName,photoUrl,email);
    })
      .catch(err => {
        console.log(err)
        console.log(err.message)
      })
  }

  // export let createUserWithEmailAndPassword = (name,email,password) => {
  //   const auth = getAuth();
  //  return createUserWithEmailAndPassword(auth,email,password)
  //     .then((userCredential) => {
  //       // Signed in 
  //       const user = userCredential.user;
  //       const newUserInfo = res.user;
  //       newUserInfo.error = ''
  //       newUserInfo.success = true;
  //       updateUserName(name)
  //       return newUserInfo;
  //       // ...
  //     })
  //     .catch((error) => {
  //       const newUserInfo = {};
  //       newUserInfo.error = error.message
  //       newUserInfo.success = false;
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       return newUserInfo;
  //       //console.log(errorMessage, errorCode)
  //       // ..
  //     });
  // }

  // export const signInWithEmailAndPassword = () => {
  //   const auth = getAuth();
  //   signInWithEmailAndPassword(auth, user.email, user.password)
  //     .then((userCredential) => {
  //       // Signed in 
  //       const user = userCredential.user;
  //       const newUserInfo = { ...user };
  //       newUserInfo.error = '';
  //       newUserInfo.success = true;
  //       setUser(newUserInfo);
  //       setLoggedInUser(newUserInfo);
  //       history.replace(from);
  //       console.log("sign in info", userCredential.user)
  //       // ...
  //     })
  //     .catch((error) => {
  //       const newUserInfo = { ...user };
  //       newUserInfo.error = error.message;
  //       newUserInfo.success = false;
  //       setUser(newUserInfo);
  //     });
  // }

  const updateUserName = name => {
    const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: name
        }).then(() => {
          // Profile updated!
          // ...
          console.log('user name update successfully')
        }).catch((error) => {
          // An error occurred
          // ...
          console.log(error);
        });

  }
