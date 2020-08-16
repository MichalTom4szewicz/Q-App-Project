import axios from 'axios'
const baseUrl = 'http://192.168.1.19:3001/api/users'


const register = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { register }