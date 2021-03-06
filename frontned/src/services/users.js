import axios from 'axios'
const baseUrl = 'http://192.168.1.19:3001/api/users'

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

const remove = id => {
  const config = {headers: {Authorization: token}}
  const request = axios.delete(`${baseUrl}/${id}`, config)
}

const changeAccess = (id, access) => {
  const config = {headers: {Authorization: token}}
  const request = axios.put(`${baseUrl}/${id}`, access, config)
  return request.then(response => response.data)
}

const updateHistory = (newHistory) => {
  const config = {headers: {Authorization: token}}
  const request = axios.put(`${baseUrl}/history`, newHistory, config)
  return request.then(response => response.data)
}

const updatePoints = (newPoints) => {
  const config = {headers: {Authorization: token}}
  const request = axios.put(`${baseUrl}/points`, newPoints, config)
  return request.then(response => response.data)
}

const updateFriends = (newFriends) => {
  const config = {headers: {Authorization: token}}
  const request = axios.put(`${baseUrl}/friend`, newFriends, config)
  return request.then(response => response.data)
}


export default {
    getAll,
    getOne,
    remove,
    changeAccess,
    setToken,
    updateHistory,
    updatePoints,
    updateFriends
  }