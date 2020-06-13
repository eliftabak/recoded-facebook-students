import React from "react";
import SignUpPage from "./SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

class App extends React.Component {

  render() {
    return ( <div>
       <SignUpPage />
       <Container />
      </div>
    )
  }
}

export default App;
