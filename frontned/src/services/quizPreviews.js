import axios from 'axios'
const baseUrl = 'http://192.168.1.19:3001/api/quizpreviews'
//const baseUrl = 'localhost/api/quizes'


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
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll,
    getOne,
    update,
    create,
    remove
  }