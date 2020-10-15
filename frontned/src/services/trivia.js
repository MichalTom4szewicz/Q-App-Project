import axios from 'axios'


const categoriesUrl = 'https://opentdb.com/api_category.php'

const questionsUrl = 'https://opentdb.com/api.php?'

//https://opentdb.com/api.php?amount=10&category=17

const getCategories = () => {
    const request = axios.get(categoriesUrl)
    return request.then(response => response.data)
}

const getOne = (amount, category) => {
    const request = axios.get(`${questionsUrl}amount=${amount}&category=${category}`)
    return request.then(response => response.data)
}

export default {
    getCategories,
    getOne
}