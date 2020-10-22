import axios from 'axios'
const baseUrl = 'http://192.168.1.19:3001/api/quizes'
//const baseUrl = 'localhost/api/quizes'

let token = null;

const setToken = newToken => {  token = `bearer ${newToken}`}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const getOne = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const create = async newObject => {
  const config = {headers: {Authorization: token}}
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


export default {
    getAll, getOne, update, create, setToken
}