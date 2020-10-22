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

import quizPreviewService from '../services/quizPreviews'
import QuizPreview from '../components/userpanel/QuizPreview';


const UserPanel = (props) => {

  const [quizPreviews, setQuizPreviews] = useState([]);

  const [alertVisible, setAlertVisible] = useState(false);

  const [choosenQuiz, setChoosenQuiz] = useState('');

  const [showPreview, setShowPreview] = useState(false);


  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)
    quizPreviewService
    .getSome(user.username, user.id)
    .then(previews => {
      setQuizPreviews(previews)
    })
  }, []);

  const selectQuiz = (quiz) => {
    setChoosenQuiz(quiz)
    setAlertVisible(true)
  }

  const dismissAlert = () => {
    setAlertVisible(false)
    setChoosenQuiz({})
  }

  const previewQuiz = (quiz) => {
    setChoosenQuiz(quiz)
    setShowPreview(true)
  }

  const deleteChoosenQuiz = () => {

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)
    quizPreviewService.setToken(user.token)

    quizPreviewService
    .remove(choosenQuiz.id)

    setQuizPreviews(qs => qs.filter(q => {return q.id !== choosenQuiz.id}))
    setChoosenQuiz({})
    setAlertVisible(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <IonText>My quizes</IonText>
          </IonTitle>

        </IonToolbar>
      </IonHeader>

      <IonContent>
      {quizPreviews.map((q, i) => {
        return (
          <IonItem button key={q.id}>
            <IonLabel onClick={() => previewQuiz(q)}>{q.title}</IonLabel>
            <IonButton onClick={() => selectQuiz(q)} color="danger">Delete</IonButton>
          </IonItem>
        )
      })}

      {showPreview ? <QuizPreview setShowPreview={setShowPreview} id={choosenQuiz.ref} /> : ''}

      <IonAlert
        isOpen={alertVisible}
        onDidDismiss={dismissAlert}
        cssClass='my-custom-class'
        // header={'Confirm!'}
        message={`U sure want to delete ${choosenQuiz.title}`}
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

    </IonPage>
  );
};

export default UserPanel;
