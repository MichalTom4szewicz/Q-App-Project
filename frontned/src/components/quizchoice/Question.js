import React, {useState, useEffect} from 'react'

import { IonCard, IonRadioGroup, IonRadio, IonicBadge, IonText, IonToggle, IonTitle, IonItemDivider, IonContent, IonCardContent, IonItem, IonIcon, IonButton, IonLabel, IonBadge} from '@ionic/react';


import quizService from '../../services/quizes'

const Question = (props) => {

  const [choice, setChoice] = useState(-1)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quiz, setQuiz] = useState({})

  const [answers, setAnswers] = useState([])


  let questions

  //questions ? setAnswers(questions[currentQuestion].answers) : console.log('s')

  useEffect(() => {
    quizService
      .getOne(props.id)
      .then(initialQuizes => {
        setQuiz(initialQuizes)
      })
      .catch(e => {
          console.log('e')
      })
  }, [])

  //console.log(answers)

  const page = () => {
      return(
          <>
            <IonText>
                <h2>{questions? questions[currentQuestion].pytanie : "ehh"}</h2>
            </IonText>

            <IonRadioGroup value={choice} onIonChange={e => setChoice(e.detail.value)}>

            {questions? console.log(questions[currentQuestion].answers[1]) : "f"}


          </IonRadioGroup>

          </>




      )
  }

  return(
    <IonCard >
      {page()}

    </IonCard>

  )
}
export default Question;