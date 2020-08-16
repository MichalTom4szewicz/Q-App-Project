import axios from 'axios'
const baseUrl = 'http://192.168.1.19:3001/api/login'
//const baseUrl = 'localhost:3001/api/login'


let token;

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const setToken = newToken => {  token = `bearer ${newToken}`}

export default { login, setToken }