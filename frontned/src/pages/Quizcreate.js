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
  IonButton} from '@ionic/react';


import QuestionForm from "../components/forms/QuestionForm"

const Quizcreate = (props) => {
  const [showPreview, setShowPreview] = useState(false);
  const [title, setTitle] = useState('')

  const [questions, setQuestions] = useState([])


  const quizForm = () => {
    const handleTitleChange = (event) =>
    {
      setTitle(event.target.value)
    }

    return(
      <IonContent>
        <IonCard>
          <IonItem>
            <IonLabel position="floating">Quiz Title</IonLabel>
            <IonInput value={title} placeholder="Enter Quiz Title" onIonChange={handleTitleChange} clearInput/>
          </IonItem>

          <QuestionForm addQuestion={setQuestions} questions={questions}/>

        </IonCard>
      </IonContent>
    )

  }

  const preview = () => {
    return(
      <IonModal isOpen={showPreview}>
        <IonContent>

          <IonCard>
            <IonList>
              <IonItem>
                <IonLabel>Title: {title}</IonLabel>
              </IonItem>

              {questions.map(q => {return(
                <IonItem key={q.pytanie}>
                  <IonLabel>{q.pytanie}</IonLabel>
                  <IonLabel>{q.valid}</IonLabel>
                  <IonList>
                    {q.answers.map(a=> <IonItem key={a}>{a}</IonItem>)}
                  </IonList>
                </IonItem>
              )})}
            </IonList>

          </IonCard>
        </IonContent>
        <IonButton onClick={() => setShowPreview(false)}>Close Preview</IonButton>

      </IonModal>
    )
  }

  const addQuiz = () => {
    const quiz = {
        title: title,
        questions: questions
    }

    console.log(quiz)

    quizService
      .create(quiz)
      .then(()=>{
        //props.history.push('/quizchoice')
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
          <IonTitle>Quiz Create</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        {quizForm()}
        <IonButton onClick={() => setShowPreview(true)}>Preview</IonButton>
        <IonButton routerLink="/quizchoice" onClick={() => addQuiz()}>Finish</IonButton>
        {preview()}



      </IonContent>

    </IonPage>
  );
};

export default Quizcreate;
