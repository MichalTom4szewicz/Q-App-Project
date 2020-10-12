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
  IonToolbar, IonRefresher, IonRefresherContent
} from '@ionic/react';

import './Quizchoice.css'

const Quizchoice = (props) => {

  const [quizShorts, setQuizShorts] = useState([])

  const doRefresh = (event) => {
    quizPreviewService
    .getAll()
    .then(initialQuizes => {
      setQuizShorts(initialQuizes)
      event.detail.complete();
    })
  }

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

      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

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
