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
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonFooter,
  IonButton,
  IonIcon,
  IonBackButton,
  IonFab, IonFabButton
} from '@ionic/react';

import {search, chevronUpSharp } from 'ionicons/icons';
import './Quizchoice.css'

import ExQuiz from '../components/quiz/ExQuiz'

const Quizchoice = (props) => {

  const [quizShorts, setQuizShorts] = useState([])

  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [triviaCard, setTriviaCard] = useState(false);

  const doRefresh = (event) => {
    quizPreviewService
    .getAll()
    .then(initialQuizes => {
      const dummy ={
        title: 'dummy',
        id: 1010101010,
        ref: 202020202020202
      }
      initialQuizes.unshift(dummy)
      setQuizShorts(initialQuizes)
      event.detail.complete();
    })
  }

  useEffect(() => {
    quizPreviewService
    .getAll()
    .then(initialQuizes => {
      const dummy ={
        title: 'dummy',
        id: 1010101010,
        ref: 202020202020202
      }
      initialQuizes.unshift(dummy)
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
          {searchBarVisible ? <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value)} showCancelButton="focus"></IonSearchbar> : ''}
        </IonHeader>

      <IonContent>
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setSearchBarVisible(s => !s)}>
            <IonIcon icon={searchBarVisible ? chevronUpSharp : search} />
          </IonFabButton>
        </IonFab>

        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonItem color='medium' slot='fixed' id='triviaButton' button onClick={() => setTriviaCard(true)}>
          <IonText>TriviaQuiz</IonText>
        </IonItem>

        {quizShorts.filter(q => {return q.title.includes(searchText)}).map( q => {
          return (
            <IonItem button href={`quizchoice/${q.ref}`} key={q.id}>
              <IonText>{q.title}</IonText>
            </IonItem>
          )})
        }

        {triviaCard ? <ExQuiz setTriviaCard={setTriviaCard} /> : ''}

      </IonContent>

    </IonPage>
  );
};

export default Quizchoice;
