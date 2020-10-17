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
  IonButton,
  IonText
} from '@ionic/react';

import './QuizPreview.css'
import quizService from '../../services/quizes'
import quizPreviewService from '../../services/quizPreviews'

import StarRatings from 'react-star-ratings';

const QuizPreview = ({id, setShowPreview}) => {

  const [quiz, setQuiz] = useState(undefined);
  // const [dummy, setDummy] = useState(false);
  const [preview, setPreview] = useState(undefined);

  useEffect(() => {
    quizService
    .getOne(id)
    .then(q => {
      setQuiz(q)
    })
    quizPreviewService
    .getOne(id)
    .then(preview => {
      setPreview(preview)
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
            {
              preview ?
              <>
                <div id='starRating'>
                  <StarRatings
                    rating={preview ? preview.ratings === 0 ? 0 :preview.ratingSum/preview.ratings : 0}
                    starRatedColor="orange"
                    numberOfStars={5}
                    starDimension="35px"
                    starSpacing="10px"
                  />
                </div>
                <hr></hr>
                <IonText>{`Times played: ${preview.timesRun}`}</IonText>
                <hr></hr>
              </> :
              <IonText>laoding...</IonText>
            }
            <IonButton onClick={() => setShowPreview(false)}>Close Preview</IonButton>

          </IonCard>
        </IonContent>
      </IonModal>
  );
};

export default QuizPreview;
