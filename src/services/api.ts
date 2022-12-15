import axios from "axios";


const api = axios.create({
  baseURL: "https://helpdesk-database.herokuapp.com/"
});

export default api;
