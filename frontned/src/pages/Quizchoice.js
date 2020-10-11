import React, {useState, useEffect} from 'react';

import quizService from '../services/quizes'
import quizPreviewService from '../services/quizPreviews'

import { IonContent,
  IonButtons,
  IonMenuButton,
  IonText,
  IonItem,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import './Quizchoice.css'

const Quizchoice = (props) => {

  const [quizShorts, setQuizShorts] = useState([])

  useEffect(() => {
    quizPreviewService
    .getAll()
    .then(initialQuizes => {
      setQuizShorts(initialQuizes)
    })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Solve QUIZ</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        {quizShorts.map( q => {
          return (
            <IonItem button href={`quizchoice/${q.ref}`} key={q.id}>
              <IonText>{q.title}</IonText>
            </IonItem>
          )})
        }

      </IonContent>

    </IonPage>
  );
};

export default Quizchoice;
