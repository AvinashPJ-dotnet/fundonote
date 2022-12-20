import axios from "axios";

export const addNote = (data) => {
  try {
    console.log(Object.keys(data)+"-"+Object.values(data));
    const result = axios.post("http://localhost:8080/api/note", data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const getNotes = () => {
    try {
      const result = axios.get("http://localhost:8080/api/note", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  };

  export const getColors = () => {
    try {
      const result = axios.get("http://localhost:8080/api/note/colors", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  };


  export const updateColors = (data,id) => {
    try {
      console.log("sending data"+Object.values(data));
      const result = axios.patch("http://localhost:8080/api/note/"+id,data ,{
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  };