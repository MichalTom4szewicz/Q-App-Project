import axios from 'axios'

const categoriesUrl = 'https://opentdb.com/api_category.php'
const questionsUrl = 'https://opentdb.com/api.php?'

//https://opentdb.com/api.php?amount=10&category=17

// const Shuffler = require('../components/quiz/Shuffler')

const getCategories = () => {
    const request = axios.get(categoriesUrl)
    return request.then(response => response.data)
}

const getOne = (amount, category) => {
    // const shuffler = new Shuffler()
    const request = axios.get(`${questionsUrl}amount=${amount}&category=${category}`)

    return request.then(response =>{

        // const shuffledQuiz = shuffler.shuffle(response.data.results)
        const shuffledQuiz = response.data.results

        shuffledQuiz.forEach(element => {
            const correct = element.correct_answer
            const incorrect =  element.incorrect_answers
            // element.answers = shuffler.shuffle(incorrect.concat(correct))
            element.answers = incorrect.concat(correct)
            element.question = element.question.replace(/&quot;/g, `"`)
            element.question = element.question.replace(/&#039;/g, `'`)
        })
        return shuffledQuiz
    })
}

export default {
    getCategories,
    getOne
}