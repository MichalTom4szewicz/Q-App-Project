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
  IonButtons,
  IonAlert
} from '@ionic/react';

import React, {useState, useEffect} from 'react';

import quizPreviewService from '../../services/quizPreviews'

const AdminQuizes = (props) => {

  const [quizPreviews, setQuizPreviews] = useState([]);

  const [alertVisible, setAlertVisible] = useState(false);

  const [choosenQuiz, setChoosenQuiz] = useState('');


  useEffect(() => {
    quizPreviewService
    .getAll()
    .then(previews => {
      setQuizPreviews(previews)
    })
  }, []);

  const selectQuiz = (title) => {
    setChoosenQuiz(title)
    setAlertVisible(true)
  }

  const dismissAlert = () => {
    setAlertVisible(false)
    setChoosenQuiz('')
  }

  const deleteChoosenQuiz = () => {
    setQuizPreviews(qs => qs.filter(q => {return q.title !== choosenQuiz}))
    setChoosenQuiz('')
    setAlertVisible(false)
  }

  return (
    <IonContent>
      <h1>quizess from  admin view</h1>

      {quizPreviews.map((q, i) => {
        return (
          <IonItem key={q.id}>
            <IonLabel>{q.title}</IonLabel>
            <IonButton onClick={() => selectQuiz(q.title)} color="danger">Delete</IonButton>
          </IonItem>
        )
      })}

      <IonAlert
        isOpen={alertVisible}
        onDidDismiss={dismissAlert}
        cssClass='my-custom-class'
        // header={'Confirm!'}
        message={`U sure want to delete ${choosenQuiz}`}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Delete',
            handler: deleteChoosenQuiz
          }
        ]}
      />
    </IonContent>
  );
};

export default AdminQuizes;
