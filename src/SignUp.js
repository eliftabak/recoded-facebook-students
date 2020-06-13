import React, { useState } from "react";
import db from "./firebase";
import { Button, Form, Col } from 'react-bootstrap';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';



const SignUpPage = () => {

  const [city, setCity] = useState('')
  const [userProfile, setUserProfile] = useState('')
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    e.persist();
    db.collection("profiles").doc(userId).set({
      city: city,
      profile: userProfile,
      name: name,
      userId: userId,
      imageUrl: imageUrl,
    })
  }
  console.log(handleSubmit)

  const googleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const login = document.getElementById('login')
      login.innerHTML = "You're sing in with Google Account."
      const token = result.credential.accessToken;
      let user = result.user;
      setName(user.displayName);
      setUserId(user.uid);
      setImageUrl(user.photoURL);
      console.log(user)
    }).catch(function (err) {
      console.log(err)
      console.log("failed")
      const login = document.getElementById('login')
      login.innerHTML = "You're failed to sing in with Google Account."
    })
  }
  
  return (
    <div className="main">
    <h1>Welcome to Re:Coded Facebook</h1>
      <Form>
        <Form.Row>
          <Button id="submit-btn" className="submit-btn"  onClick={ googleSignIn } variant="secondary" size="sm">
            Login with Google
          </Button>
        <Form.Row>
        
          <span id="login"></span>
        </Form.Row>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control className="input" onChange={ (e) => setUserProfile(e.target.value) } placeholder="Your Motto" />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control className="input" onChange={ (e) => setCity(e.target.value) } placeholder="City" />
          </Col>
        </Form.Row>
        <Form.Row>
          <Button className="submit-btn" onClick={ handleSubmit } variant="outline-info">Submit</Button>
        </Form.Row>
      </Form>
    </div>
  )

}

export default SignUpPage;
