import axios from 'axios'


const categoriesUrl = 'https://opentdb.com/api_category.php'

const getCategories = () => {
    const request = axios.get(categoriesUrl)
    return request.then(response => response.data)
}

export default {
    getCategories,
}