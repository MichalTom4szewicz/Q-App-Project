import React, {useState, useEffect} from 'react'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonRadioGroup,
  IonRadio,
  IonicBadge,
  IonText,
  IonToggle,
  IonTitle,
  IonItemDivider,
  IonContent,
  IonCardContent,
  IonItem,
  IonIcon,
  IonButton,
  IonLabel,
  IonBadge,
  IonCardHeader,
  IonToast,
  IonCheckbox
} from '@ionic/react';

import triviaService from '../services/trivia'

import TriviaQuestions from '../components/quiz/TriviaQuestions'

const TriviaQuiz = (props) => {
  const [questions, setQuestions] = useState(undefined);

  useEffect(() => {
    const category = props.match.params.category

    triviaService
    .getOne(2, category)
    .then(quiz => {
      setQuestions(quiz)
    })
  }, [])

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>TriviaQuiz</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {questions ? <TriviaQuestions questions={questions} /> : <h1>loding</h1> }
      </IonContent>

    </IonPage>
  )
}

export default TriviaQuiz;