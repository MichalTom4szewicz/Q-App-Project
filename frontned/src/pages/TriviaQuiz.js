import {IonList,
  IonListHeader,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonIcon,
  IonCardContent,
  IonCardHeader,
  IonRadio,
  IonRadioGroup,
  IonLabel,
  IonItem,
  IonText,
  IonButton,
  IonMenuButton,
  IonButtons
} from '@ionic/react';

import React, {useState, useEffect} from 'react';

import triviaService from '../services/trivia'

import Questions from '../components/quiz/Questions'

const TriviaQuiz = (props) => {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const category = props.match.params.category

    triviaService
    .getOne(20, category)
    .then(quiz => {
      setQuestions(quiz.results)
    })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>title</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {
          questions.map((q, i) => {
            return (
              <IonItem key={i}>
                <h4>{q.question}</h4>
              </IonItem>

            )
          })
        }
      </IonContent>

    </IonPage>
  );
};

export default TriviaQuiz;
