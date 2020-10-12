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
import quizService from '../../services/quizes'

const QuizPreview = ({id, setShowPreview}) => {

  const [quiz, setQuiz] = useState(undefined);
  const [dummy, setDummy] = useState(false);

  useEffect(() => {
    quizService
    .getOne(id)
    .then(q => {
      setQuiz(q)
    })
  }, []);

  return (
    <IonModal isOpen={true}>
        <IonContent>
          <IonCard>
            <IonList>
              <IonItem>
                <IonLabel>Title: {quiz ? quiz.title : 'loading'}</IonLabel>
              </IonItem>

              {quiz ? quiz.questions.map((q, i )=> {
                return(
                  <IonCard key={i}>
                    <img src={q.image} alt="" width="100%"></img>
                    <IonLabel className="questionPreview">{q.pytanie}</IonLabel>
                    <IonList>
                      {q.answers.map((a, i)=> {
                        return (
                          <IonItem>
                            <IonLabel className="prevIt ion-text-wrap" style={q.valid.indexOf(a) > -1 ? {background: 'lime'} : {}} key={i}>{a}</IonLabel>
                          </IonItem>
                        )
                      })}
                    </IonList>
                  </IonCard>
                )})
              : 'loading'}
            </IonList>
            <IonButton onClick={() => setShowPreview(false)}>Close Preview</IonButton>

          </IonCard>
        </IonContent>
      </IonModal>
  );
};

export default QuizPreview;
