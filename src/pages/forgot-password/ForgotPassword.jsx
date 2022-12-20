import { Card, TextField,Button } from "@mui/material";
import React, { Component } from "react";
import { forgotPassword } from "../../services/UserService";
import "./ForgotPassword.css";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
        emailId:""
    };
  }

  handleEmail = (event) => {
    this.setState({
      emailId : event.target.value
    })
  }

  handleSubmit = ()=> {
    let data={
      email:this.state.emailId
    }

    forgotPassword(data).then((res)=>{
      console.log(res);
    }).catch((error)=>{
        console.log(error);
    })
  }

  render() {
    return (
      <div className="verifyContainer">
        <Card id="verifyCard">
        <h1>Forgot Password</h1>
          <div className="verifyEmail">
            <TextField
              id="outlined-basic"
              name="email"
              label="Email"
              variant="outlined"
              placeholder="Email"
              onChange={this.handleEmail}
            />
          </div>
          <div className="SignInButton">
            <Button variant="contained" onClick={this.handleSubmit}>
              Verify
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default ForgotPassword;
