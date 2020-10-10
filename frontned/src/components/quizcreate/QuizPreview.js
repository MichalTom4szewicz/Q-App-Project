import React, {useState, useEffect} from 'react';

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
  IonButton
} from '@ionic/react';

import './QuizPreview.css'

const QuizPreview = ({questions, setQuestions, title, setShowPreview}) => {

  const deleteQuestion = (quest) => {
    setQuestions(q => q.delete(quest))
  }

  return (
    <IonModal isOpen={true}>
        <IonContent>
          <IonCard>
            <IonList>
              <IonItem>
                <IonLabel>Title: {title}</IonLabel>
              </IonItem>

              {Array.from(questions).map((q, i )=> {
                return(
                <IonCard key={i}>
                  <IonLabel id="questionPreview">{q.pytanie}</IonLabel>
                  <IonList>
                    {q.answers.map((a, i)=> {
                      return (
                        <IonItem>
                          <IonLabel className="it" style={q.valid.indexOf(a) > -1 ? {background: 'lime'} : {}} key={i}>{a}</IonLabel>
                        </IonItem>
                      )
                    })}
                  </IonList>
                  <IonButton onClick={() => deleteQuestion(q)}>x</IonButton>
                  </IonCard>
                )})
              }
            </IonList>
            <IonButton onClick={() => setShowPreview(false)}>Close Preview</IonButton>

          </IonCard>
        </IonContent>
      </IonModal>
  );
};

export default QuizPreview;
