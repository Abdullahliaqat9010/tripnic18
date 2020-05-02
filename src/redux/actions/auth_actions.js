import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import functions from '@react-native-firebase/functions'

import {LoginManager,AccessToken} from 'react-native-fbsdk'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

GoogleSignin.configure({webClientId:'338070094498-fe0uj618cafu7vfd3uj1v9bv2a74bt9j.apps.googleusercontent.com'});

// Signing up with Email
const emailSignup = (email,password) => { 
  return new Promise(async(res,rej)=>{
    if(email === "" || password === ""){
      rej("Empty email or password fields")
      return
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password)
      res()
    } catch (error) {
      if(error.code === "auth/unknown"){
        rej("Network Error. Please check your wifi or mobile data.")
      }
      else
      rej(error.message.split(']')[1])
    }
  })    
  
};

//Create new user
const createUser = (userProfile,userRole)=>dispatch=>{
  return new Promise(async(res,rej)=>{
    try {
        var createNewUser = functions().httpsCallable('createNewUser')
        await createNewUser({userRole,userProfile})
        res()
        dispatch({
          type:"NewUserCreated",
          userProfile
        })
    } 
    catch (error) {
      rej(error)
    }
  })
}

// Signing in with Firebase
const emailSignin = (email, password) => {
     return new Promise(async(res,rej)=>{
      if(email === "" || password === ""){
        rej("Empty email or password fields")
        return
      }
      try {
        await auth().signInWithEmailAndPassword(email, password)
        res()
      } 
      catch (error) {
        if(error.code === "auth/unknown"){
          rej("Network Error. Please check your wifi or mobile data.")
        }
        else
        rej(error.message.split(']')[1])  
      }
    })
};


// Validate user 
const validateUser = (userRole) => dispatch => {
  return new Promise((res,rej)=>{
    const unsubscribe = auth().onAuthStateChanged(async(user)=>{
      try {  
        if(user){
          const {claims} = await user.getIdTokenResult(true)
          const doc = await firestore().collection(claims.organizer?'organizers':'travellers').doc(user.uid).get()
          if(claims.organizer !== null){
            if(claims.organizer === userRole){
              if(doc.exists){
                unsubscribe()
                res(true)
              }
              else{
                unsubscribe()
                res(false)
              }
            }
            else{
              rej("you are not authorized here")
            }
          }
          else{
            res(false)
          }
        }
      }
      catch (error) {
        rej(error)
      }     
    })
   
  })   
}


//Valid user on start

const validateUserOnStart = () => dispatch => {
  return new Promise(async(res,rej)=>{
    const unsubscribe = auth().onAuthStateChanged(async(user)=>{
      try {
        if(user){
          const {claims} = await user.getIdTokenResult(true)
          const doc = await firestore().collection(claims.organizer?'organizers':'travellers').doc(user.uid).get()
        if(doc.exists){
            
            res(true)
            dispatch({
              type:"ProfileFetchedOnStart",
              userProfile:doc.data(),
              isOrganizer:claims.organizer
            })
            unsubscribe()
          }
          else{
            
            res(false)
            dispatch({
              type:"ProfileFetchedOnStart",
              userProfile:null,
              isOrganizer:claims.organizer
            })
            unsubscribe()
          }
        }
        else{
          
          res(null)
            dispatch({
              type:"ProfileFetchedOnStart",
              userProfile:null,
              isOrganizer:claims.organizer
            })
            unsubscribe()
        }
      
      }
      catch (error) {
        if(error.code === "auth/unknown"){
          rej("Network Error. Please check your wifi or mobile data")
        }
        rej(error)
        unsubscribe()
      }
    })
  })
  
}



// Signing out with Firebase
const signout = () => dispatch => {
  return new Promise((res,rej)=>{
    const unsubscribe = auth().onAuthStateChanged(async user=>{
      try {
        if(user){
            await auth().signOut()
            LoginManager.logOut()
            if(GoogleSignin.isSignedIn){
              await GoogleSignin.signOut()
            }
            
            res()
            dispatch({
              type:"Signout"
            })
            unsubscribe()
        }
        else{
          unsubscribe()
        }
      } 
      catch (error) {
        rej(error)
        unsubscribe()
      }
    })
  })
};

// Reset password with Firebase
const resetPassword = email => {
  return auth().sendPasswordResetEmail(email)
};

const facebookLogin = () => {
  return new Promise(async (res,rej)=>{
    try {  
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {   
            rej("Fb login cancelled")
      }
  
      else{
        const data = await AccessToken.getCurrentAccessToken();
        if(!data) {      
            rej("Unable to get access token")    
        }
        else{
          const credential = auth.FacebookAuthProvider.credential(data.accessToken);
          await auth().signInWithCredential(credential);
          res()
        }
    }
    } catch (e) {
      if(typeof e === "object"){
        if(e.message === "CONNECTION_FAILURE: CONNECTION_FAILURE" ){
          rej("Network Error. Please check your wifi or mobile data")
        }
        else{
          rej(e.message)
        }
      }
      else{
        rej("Login Error.")
      }
    }
  })
}

const googleLogin = () => {
  return new Promise(async(res,rej)=>{
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const data = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      await auth().signInWithCredential(credential);
      res()
  
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            rej("Google Login Cancelled") 
      }
      else if (error.code === statusCodes.IN_PROGRESS) {
        rej("Google Login Already in progress") 
      }
      else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        rej("Google Play Services not available") 
      } 
      else {
        rej("Login Error. Please check your internet connection.") 
      }
      
    }
  })
}


const sendPhoneVerificationCode = (phone) => {
      return new Promise((res,rej)=>{
        auth().verifyPhoneNumber(phone,90).on('state_changed', (phoneAuthSnapshot) => {
          console.log(phoneAuthSnapshot)
          if(phoneAuthSnapshot.state === "sent"){
            res(phoneAuthSnapshot.verificationId)
            return
          }
          else if(phoneAuthSnapshot.state === "error"){
            rej("An error occured while verifying your phone")
            return
          }
          else if(phoneAuthSnapshot.state === "verified"){
            if(phoneAuthSnapshot.verificationId === null){
              rej("This number is already associated with an account")
              return
            }
            else{
              res(phoneAuthSnapshot.verificationId)
              return
            }
          }
        }, (error) => {
          rej(error)
          return
        });      
      })
}

const verifyCode = (code,verificationId)  => {
  auth.PhoneAuthProvider.credential()
  const credentials = auth.PhoneAuthProvider.credential(verificationId,code)
  return auth().currentUser.updatePhoneNumber(credentials)
}

const navigateToMainApp = () => dispatch => {
  dispatch({
    type: "Login"
  })
}

const changeRole = (role)=>dispatch=>{
  dispatch({
    type:"changeRole",
    role:role
  })
}

const addCompanyInfo = (name,about)=>dispatch=>{
  return new Promise((res,rej)=>{
    const unsubscribe = auth().onAuthStateChanged(async(user)=>{
      try {
        if(user){
          await firestore().collection('organizers').doc(user.uid).update({
            companyName:name,
            about:about
          })
          dispatch({
            type:"CompanyInfo",
            companyName:name,
            about:about
          })
          res()
          unsubscribe()
        }
        else{
          rej("No user currently logged in")
        }
      } catch (error) {
        rej(error)
      }
    })
  })
}

const addSocialLinks = (fb,instagram,youtube,twitter)=>dispatch=>{
  return new Promise((res,rej)=>{
    const unsubscribe = auth().onAuthStateChanged(async(user)=>{
      try {
        if(user){
          await firestore().collection('organizers').doc(user.uid).update({
            "socialLinks.fb":fb,
            "socialLinks.instagram":instagram,
            "socialLinks.twitter":twitter,
            "socialLinks.youtube":youtube
          })
          dispatch({
            type:"SocialLinks",
            fb:fb,
            instagram:instagram,
            twitter:twitter,
            youtube:youtube
          })
          res()
          unsubscribe()
        }
        else{
          rej("No user currently logged in")
        }
      } catch (error) {
        rej(error)
      }
    })
  })
}

export{addCompanyInfo,addSocialLinks,changeRole,validateUserOnStart,validateUser,createUser,sendPhoneVerificationCode,verifyCode,emailSignin,emailSignup,facebookLogin,googleLogin,navigateToMainApp,signout,resetPassword}
