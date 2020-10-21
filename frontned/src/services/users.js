import axios from 'axios'
const baseUrl = 'http://192.168.1.19:3001/api/users'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
}

const changeAccess = (id, newAccess) => {
  const request = axios.put(`${baseUrl}/${id}`, newAccess)
  return request.then(response => response.data)
}

export default {
    getAll,
    getOne,
    remove,
    changeAccess
  }