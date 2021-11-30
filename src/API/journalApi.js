 import axios from 'axios'

 const journalApi = axios.create({
     baseURL: 'https://journal-9bb2f-default-rtdb.firebaseio.com'
 })

 export default journalApi