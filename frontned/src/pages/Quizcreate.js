import React, {useState} from 'react';

import quizService from '../services/quizes'

import {IonList,IonModal,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonContent,
  IonLabel,
  IonInput,
  IonItem,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonToast, IonBadge
} from '@ionic/react';


import QuestionForm from "../components/quizcreate/QuestionForm"
import QuizPreview from '../components/quizcreate/QuizPreview'

const Quizcreate = (props) => {
  const [showPreview, setShowPreview] = useState(false);
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState(new Set())

  const [toastMessage, setToastMessage] = useState('')
  const [toastColor, setToastColor] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const [canRedirect, setCanRedirect] = useState(false);

  const setTimeoutedToast = (message, color) => {
    setToastMessage(message)
    setToastColor(color)
    setToastVisible(true)

    setTimeout(() => {
      setToastMessage('')
      setToastVisible(false)
      setToastColor('')

    }, 2000)
  }

  const quizForm = () => {
    return(
      <>
        <IonItem>
          {/* <IonLabel position="floating">Quiz Title</IonLabel> */}
          <IonInput value={title} placeholder="Quiz Title" onIonChange={e => setTitle(e.target.value)} clearInput/>
        </IonItem>

        <QuestionForm setQuestions={setQuestions} setCanRedirect={setCanRedirect} questions={questions} />
      </>
    )
  }


  const addQuiz = () => {

    if(title === '') {
      setTimeoutedToast('Enter title of your quiz', 'danger')
      return
    }
    if(Array.from(questions).length < 2) {
      setTimeoutedToast('Quiz must contain at least 2 questions', 'danger')
      return
    }

    setCanRedirect(true)

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)

    const quiz = {
      title: title,
      questions: Array.from(questions),
      author: {username: user.username}
    }

    quizService.setToken(user.token)

    quizService
    .create(quiz)
    .then(()=>{
      //props.history.push('/quizchoice')
      setCanRedirect(false)
      window.location.reload(false);
    })
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Create QUIZ</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard>
          {quizForm()}

          <IonButton onClick={() => setShowPreview(true)}>Preview</IonButton>
          {canRedirect ? <IonButton routerLink="/quizchoice" onClick={addQuiz}>Finish</IonButton> :
            <IonButton onClick={addQuiz}>Finish</IonButton>
          }

          {/* {Array.from(questions).length} */}
        </IonCard>

        {showPreview ? <QuizPreview title={title} setQuestions={setQuestions} questions={questions} setShowPreview={setShowPreview} /> :"" }

        <IonToast
          isOpen={toastVisible}
          onDidDismiss={() => setToastVisible(false)}
          message={toastMessage}
          position="middle"
          duration={1500}
          color={toastColor}
        />

      </IonContent>
    </IonPage>
  );
};

export default Quizcreate;
