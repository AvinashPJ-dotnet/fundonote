import { Card, TextField, Button , Snackbar,IconButton } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../../utils/withRouter";
import { loginUser } from "../../services/UserService";
import "./SignIn.css";


class SignIn extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      SnackbarOpen: false,
      SnackbarMessage: ""
    };
    // let history = useNavigate();
  }

  SnackbarClose() {
    this.setState(
      {
        SnackbarOpen: false
      }
    )
  }

  handleInput = (event) => {
    if (event.target.id === "username") {
      this.setState({
        username: event.target.value,
      });
    } else {
      this.setState({
        password: event.target.value,
      });
    }
  };

  handleSubmit = async () => {
    let data = {
      username: this.state.username,
      password: this.state.password,
    };

    await loginUser(data)
      .then((res) => {
        let messaage = "";
        if(res.data.statusCode === 200){
            messaage = "Sign In Successful"
            console.log("response" + res.data.message);
            localStorage.setItem('token',res.data.message);
            console.log("token =----"+localStorage.getItem('token'));
            this.setState({
                SnackbarOpen: true,
                SnackbarMessage: messaage
              })
            //   let history = useNavigate();
            console.log(this.props);
            this.props.navigate('/home')
        }

        
        
      })
      .catch((error) => {
        console.log("error" + error);
      });
  };

  render() {
    return (
      <div className="SignInContainer">
        <Card id="sign-in-card">
          <h1>Sign In</h1>
          <div className="SignInNames">
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              placeholder="Username"
              onChange={this.handleInput}
            />
          </div>
          <div className="SignInNames">
            <TextField
            type="password"
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              placeholder="Password"
              onChange={this.handleInput}
            />
          </div>
          <div>
            <p><Link to="/forgot-password">Forgot Password?</Link></p>
          </div>
          <div className="SignInButton">
            <Button variant="contained" onClick={this.handleSubmit}>
              SignIn
            </Button>
          </div>
          <div>
            <p>Don't Have An Account With Us?<Link to="/signup">Click Here</Link></p>
          </div>
        </Card>

        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.SnackbarOpen}
          severity="success"
          message={<span id="message-id">{this.state.SnackbarMessage}</span>}
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={() => this.SnackbarClose()}
              aria-label="Close">
              {" "}X{" "}
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default withRouter(SignIn);