import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-build-burger-project.firebaseio.com/",
});

export default instance;
