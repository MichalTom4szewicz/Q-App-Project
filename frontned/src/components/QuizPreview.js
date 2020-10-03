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
  IonButton} from '@ionic/react';

const QuizPreview = ({questions, title, setShowPreview}) => {

  return (
    <IonModal isOpen={true}>
        <IonContent>
          <IonCard>
            <IonList>
              <IonItem>
                <IonLabel>Title: {title}</IonLabel>
              </IonItem>

              {questions.map((q, i )=> {return(
                <IonItem key={i}>
                  <IonLabel>{q.pytanie}</IonLabel>
                  <IonLabel>{q.valid}</IonLabel>
                  <IonList>
                    {q.answers.map((a, i)=> <IonItem key={i}>{a}</IonItem>)}
                  </IonList>
                </IonItem>
              )})}
            </IonList>

            <IonButton onClick={() => setShowPreview(false)}>Close Preview</IonButton>

          </IonCard>
        </IonContent>
      </IonModal>
  );
};

export default QuizPreview;
