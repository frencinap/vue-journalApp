import axios from "axios";

const journalApi = axios.create({
  baseURL: 'https://journal-9bb2f-default-rtdb.firebaseio.com'
});

journalApi.interceptors.request.use((config) => {
  
  config.params = {
    auth: localStorage.getItem('idToken')
  }
  return config
})

//console.log( process.env.NODE_ENV ); //TEST cuando estoy en tetsing

export default journalApi;
