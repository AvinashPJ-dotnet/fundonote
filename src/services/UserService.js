import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export const registerUser = (data) => {
  try {
    const response = axios.post("http://localhost:8080/user/", data);
    console.log("response--" + response);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = (data) => {
  try {
    const response = axios.put("http://localhost:8080/user/login", data);
    console.log("response--" + response);
    return response;
  } catch (error) {
    return error;
  }
};

export const forgotPassword = (data) => {
  try {
    let emailId = Object.values(data);
    const response = axios.post(
      "http://localhost:8080/user/forgotPassword?email=" + emailId
    );
    console.log("response--" + response);
    return response;
  } catch (error) {
    return error;
  }
};

export const resetPassword = (data,id) => {
    try {

      const response = axios.post(
        "http://localhost:8080/user/resetPassword/" + id , data
      );
      console.log("response--" + response);
      return response;
    } catch (error) {
      return error;
    }
  };
