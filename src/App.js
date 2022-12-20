import React, { Component } from "react";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signin/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ButtonAppBar from "./components/ButtonAppBar";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import NoteCard from "./components/note-card/NoteCard";
import Home from "./pages/home/Home";
import ResetPassword from "./pages/reset-password/ResetPassword";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact  path="/" element={<SignIn/>} />
          <Route exact  path="/signup" element={<SignUp/>} />
          <Route exact  path="/forgot-password" element={<ForgotPassword/>} />
          <Route exact  path="/user/resetPassword/:id" element={<ResetPassword/>} />
          <Route exact  path="/home" element={<Home/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;
