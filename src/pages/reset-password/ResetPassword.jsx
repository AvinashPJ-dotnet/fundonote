import { Card, TextField, Button, Snackbar ,IconButton } from "@mui/material";
import React, { Component } from "react";
import { resetPassword } from "../../services/UserService";
import { withRouter } from "../../utils/withRouter";
import "./ResetPassword.css";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
      SnackbarOpen: false,
      SnackbarMessage: "",
    };
  }

  SnackbarClose() {
    this.setState({
      SnackbarOpen: false,
    });
  }

  handleInput = (event) => {
    if (event.target.name === "password") {
      this.setState({
        newPassword: event.target.value,
      });
    } else if (event.target.name === "confirmPassword") {
      this.setState({
        confirmPassword: event.target.value,
      });
    }
  };

  handleSubmit = async (id) => {
    let data = {
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword,
    };

    await resetPassword(data, id)
      .then((res) => {
        console.log(res.data.statusCode);
        if (res.data.statusCode === 200) {
          this.setState({
            SnackbarOpen: true,
            SnackbarMessage: "Password reset Successfull",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log("this is parameter id--" + this.props.params.id);
    let id = this.props.params.id;
    return (
      <div className="PRContainer">
        <Card id="RPCard">
          <h1>Reset Password</h1>
          <div className="ResetPasswords">
            <TextField
              id="outlined-basic"
              name="password"
              label="Password"
              variant="outlined"
              placeholder="Password"
              onChange={this.handleInput}
            />

            <TextField
              id="outlined-basic"
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              placeholder="Confirm Password"
              onChange={this.handleInput}
            />
          </div>
          <div className="ResetButton">
            <Button variant="contained" onClick={() => this.handleSubmit(id)}>
              Submit
            </Button>
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

export default withRouter(ResetPassword);
