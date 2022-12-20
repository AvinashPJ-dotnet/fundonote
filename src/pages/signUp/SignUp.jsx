import { Card, TextField, Button } from "@mui/material";
import React, { Component } from "react";
import { validFirstName, validEmail } from "../../utils/regex";
import { registerUser } from "../../services/UserService";
import SignIn from "../../pages/signin/SignIn"
import "./SignUp.css";
import { Link } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username:"",
      password: "",
      confirmPassword: "",
      errorFirstName: "",
      errorEmail: "",
      errorLastName: "",
      errorPassword: "",
      errorCPassword: "",
    };
  }

  //if not use arrow function then use bind in constructor
  handleFirstName = (event) => {
    console.log(event.target.value);
    if (!validFirstName.test(event.target.value)) {
      this.setState({
        firstName: event.target.value,
        errorFirstName: "Please Check First Name",
      });
    } else {
      this.setState({
        firstName: event.target.value,
        errorFirstName: "",
      });
    }
  };
  handleLastName = (event) => {
    console.log(event.target.value);
    if (!validFirstName.test(event.target.value)) {
      this.setState({
        lastName: event.target.value,
        errorLastName: "Please Check Last Name",
      });
    } else {
      this.setState({
        lastName: event.target.value,
        errorLastName: "",
      });
    }
  };
  handleEmail = (event) => {
    console.log(event.target.value);
    if (!validEmail.test(event.target.value)) {
      this.setState({
        email: event.target.value,
        errorEmail: "Enter Valid Email Id",
      });
    } else if(event.target.value === " "){
        this.setState({
            errorEmail: "",
          });
    }
    
    
    else {
      this.setState({
        email: event.target.value,
        errorEmail: "",
      });
    }
  };

  handlePassword = (event) => {
    this.setState({
      confirmPassword: event.target.value
    });
    console.log(this.state.password);
    console.log(this.state.confirmPassword);
    if (this.state.password === this.state.confirmPassword) {
        this.setState({
          password: this.state.password,
          errorCPassword: "",
        });
    } else {
        this.setState({
          password: this.state.confirmPassword,
          errorCPassword: "Password Doesn't match..",
        });
    }
  };

  handleInputs = (event) =>{
    let id = event.target.id;
    if(id === "username"){
        this.setState({
            username:event.target.value
        })
    }
  };

  handleSubmit = async () => {
    let data = {
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        email:this.state.email,
        username:this.state.username,
        password:this.state.password
        
    }
    await registerUser(data).then((res)=>{
        console.log("response"+res);

    })
    .catch((error)=>{
        console.log("error"+error);
    })
  };

  render() {
    return (
      <div className="signUpContainer">
        <Card id="sign-up-card">
          <h1>Sign Up</h1>
          <div className="signUpNames">
            <div>
              <TextField
                id="first-name"
                name="firstName"
                label="First Name"
                variant="outlined"
                placeholder="First Name"
                onChange={this.handleFirstName}
                required
              />
              {this.state.errorFirstName && (
                <div className="error"> {this.state.errorFirstName} </div>
              )}
            </div>
            <div>
              <TextField
                id="last-name"
                name="lastName"
                label="Last Name"
                variant="outlined"
                placeholder="Last Name"
                onChange={this.handleLastName}
                helperText={<div className="error">{this.state.errorLastName}</div>}
              />
            </div>
          </div>
          <div className="sign-up-email">
            <TextField
              id="email-id"
              className="email-id"
              name="email"
              label="Email"
              variant="outlined"
              placeholder="Email"
              onChange={this.handleEmail}
              helperText={<div className="error">{this.state.errorEmail}</div>}
            />
          </div>

          <div className="sign-up-username">
            <TextField
              id="username"
              className="username"
              name="username"
              label="Username"
              variant="outlined"
              placeholder="Username"
              onChange={this.handleInputs}
              required
            />
          </div>

          <div className="sign-up-password">
            <TextField
            type="password"
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              placeholder="Password"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              required
            />

            <div>
              <TextField
              type="password"
                id="confirm-password"
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                placeholder="Confirm Password"
                onChange={this.handlePassword}
                required
              />
              {this.state.errorCPassword && (
                <div className="error"> {this.state.errorCPassword} </div>
              )}
            </div>
          </div>

          <div className="SignUpButton">
            <Button variant="contained" onClick={this.handleSubmit}>
              SignUp
            </Button>
          </div>
          <div>
            <p> Already have account <Link to="/">click to SignIn</Link> </p>
          </div>
        </Card>
      </div>
    );
  }
}

export default SignUp;
