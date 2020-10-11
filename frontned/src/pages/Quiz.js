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
  IonButtons
} from '@ionic/react';

import React, {useState, useEffect} from 'react';

import quizService from '../services/quizes'

import Questions from '../components/quiz/Questions'

const Quiz = (props) => {

  const [title, setTitle] = useState('')

  const [statsInfo, setStatsInfo] = useState();

  const [view, setView] = useState('info');

  const [id, setId] = useState('');

  useEffect(() => {
    const id = props.match.params.id

    quizService
    .getOne(id)
    .then(quiz => {
      setTitle(quiz.title)
      setId(quiz.id)
      setStatsInfo('some data')
    })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        {view === 'quiz' ? <Questions id={id} setView={setView}/>:
          <>
            <IonText>Jakies durne statysyki</IonText>
            {statsInfo}

            <IonButton onClick={() => setView('quiz')}>
              Start!
            </IonButton>
          </>
        }
      </IonContent>

    </IonPage>
  );
};

export default Quiz;
