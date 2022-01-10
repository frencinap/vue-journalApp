import axios from "axios";

const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
  params: {
    key: 'AIzaSyDERuthTUdK6vNwkQ3v7YjHZwJMGepV_wI'
  }
});

//console.log( process.env.NODE_ENV ); //TEST cuando estoy en tetsing

export default authApi;
