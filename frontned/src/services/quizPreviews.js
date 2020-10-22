import axios from 'axios'
const baseUrl = 'http://192.168.1.19:3001/api/quizpreviews'
//const baseUrl = 'localhost/api/quizes'

let token = null;
const setToken = newToken => {  token = `bearer ${newToken}`}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getSome = (username, userId) => {
    const request = axios.get(`${baseUrl}/user/${username}/${userId}`)
    return request.then(response => response.data)
}

const getOne = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, propsToUpdate) => {
    const request = axios.put(`${baseUrl}/${id}`, propsToUpdate)
    return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const remove = id => {
    const config = {headers: {Authorization: token}}
    const request = axios.delete(`${baseUrl}/${id}`, config)
}

export default {
    getAll,
    getSome,
    getOne,
    update,
    create,
    remove,
    setToken
  }