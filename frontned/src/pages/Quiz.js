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
  IonRange
} from '@ionic/react';

import React, {useState, useEffect} from 'react';
import { sunny } from 'ionicons/icons';
import quizService from '../services/quizes'
import quizPreviewService from '../services/quizPreviews'

import Questions from '../components/quiz/Questions'

import StarRatings from 'react-star-ratings';

import './Quiz.css'

const Quiz = (props) => {

  const [title, setTitle] = useState('')

  const [statsInfo, setStatsInfo] = useState();

  const [view, setView] = useState('info');

  const [id, setId] = useState('');

  const [quiz, setQuiz] = useState();

  const [preview, setPreview] = useState(undefined);
  const [rating, setRating] = useState(0);

  const [repetitions, setRepetitions] = useState(2);

  useEffect(() => {
    const id = props.match.params.id

    quizPreviewService
    .getOne(id)
    .then(preview => {
      setPreview(preview)

      if(preview.ratings !== 0) {
        setRating(preview.ratingSum/preview.ratings)
      }
    })

    quizService
    .getOne(id)
    .then(quiz => {
      setTitle(quiz.title)
      setId(quiz.id)
      setStatsInfo('some data')
      setQuiz(quiz)
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

        {view === 'quiz' ? <Questions quiz={quiz} id={id} setView={setView}/>:
          <>
            {
              preview ?
              <IonCard>
                <IonCardHeader>
                  <IonTitle>Jakies durne statysyki</IonTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>{`Times played by community: ${preview.timesRun}`}</IonText>
                  <hr></hr>
                  <IonText>{`Users' rating:`}</IonText>
                  <div id='starRating'>
                  <StarRatings
                    rating={rating}
                    starRatedColor="orange"
                    numberOfStars={5}
                    starDimension="35px"
                    starSpacing="10px"
                  />
                  </div>
                  <hr></hr>
                  <IonItem button routerLink={`/users/${preview.author.id}`}>{`Author: ${preview.author.username}`}</IonItem>
                  <hr></hr>

                  <IonText>How many successful repetitions until the end?</IonText>

                  <IonItem>
                    <IonRange min={1} max={5} step={1} snaps={true} onIonChange={e => setRepetitions(e.detail.value)} />
                  </IonItem>

                </IonCardContent>
              </IonCard> :
              <IonText>loading...</IonText>
            }

            <IonButton onClick={() => setView('quiz')}>
              Start quiz!
            </IonButton>
            <IonButton onClick={() => setView('quiz')}>
              {`Start repeting with ${repetitions}`}
            </IonButton>
          </>
        }
      </IonContent>

    </IonPage>
  );
};

export default Quiz;
