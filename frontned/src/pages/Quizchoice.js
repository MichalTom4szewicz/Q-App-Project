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
  IonToolbar} from '@ionic/react';

const Quizchoice = (props) => {

  const [quizes, setQuizes] = useState([])

  useEffect(() => {
    quizPreviewService
      .getAll()
      .then(initialQuizes => {
        setQuizes(initialQuizes)
      })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Quiz Choice</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        {quizes.map( q => { return (
          <IonItem button routerLink={"quizchoice/"+q.ref} key={q.id}>
            <IonText>{q.title}</IonText>
          </IonItem>
        )})}


      </IonContent>

    </IonPage>
  );
};

export default Quizchoice;
