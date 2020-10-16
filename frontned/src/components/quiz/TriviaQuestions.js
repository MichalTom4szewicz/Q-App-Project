import React, {useState, useEffect} from 'react'

import {
  IonCard,
  IonRadioGroup,
  IonRadio,
  IonicBadge,
  IonText,
  IonToggle,
  IonTitle,
  IonItemDivider,
  IonContent,
  IonCardContent,
  IonItem,
  IonIcon,
  IonButton,
  IonLabel,
  IonBadge,
  IonCardHeader,
  IonToast,
  IonCheckbox
} from '@ionic/react';

import {addOutline,checkmark, close, happy,mailOutline, mailSharp, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import quizService from '../../services/quizes'

import './TriviaQuestions.css'

const TriviaQuestions = ({questions}) => {
  const [counter, setCounter] = useState(0);
  const [selected, setSelected] = useState([]);
  const [points, setPoints] = useState(0);

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizOver, setQuizOver] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);

  const [toastMessage, setToastMessage] = useState('')
  const [toastColor, setToastColor] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const [dummy, setDummy] = useState(false);

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

  const apply = () => {

    if(selected === questions[counter].correct_answer) {
      setPoints(p => p+1)
    }

    if(selected === '') {
      setTimeoutedToast('Check answer', 'danger' )
      return
    }

    const historyItem ={
      question: questions[counter].question,
      selected: selected,
      correct_answer: questions[counter].correct_answer
    }

    setAnswerChecked(true)
    setHistory(h => h.concat(historyItem))
  }

  const next = () => {
    if(counter+1 !== questions.length) {

      setCounter(c => c+1)
      setSelected('')
      setAnswerChecked(false)
    } else {
      setQuizOver(true)
    }
  }

  const applyButton = () => {
    return (
      <IonButton onClick={apply}>
        apply
      </IonButton>
    )
  }

  const nextButton = () => {
    return (
      <IonButton onClick={next}>
        {counter + 1 === questions.length ? 'go to summary' : 'next'}
      </IonButton>
    )
  }

  const quiz = () => {
    return (
      <>
      <IonCardHeader>
          <IonText>{`${counter+1}/${questions.length}`}</IonText>
          <IonText>
            <h4>{questions[counter].question}</h4>
          </IonText>
        </IonCardHeader>

        <IonCardContent>
          <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
            {questions[counter].answers.map( a => {return (
              <IonItem key={a}>
                <div style={answerChecked ? questions[counter].correct_answer === a ? {background: 'springgreen'} : {background: 'lightcoral'} : {}} className="questionsText">
                  {a}
                </div>
                <IonRadio slot="start" value={a}/>
              </IonItem>
            )})}
          </IonRadioGroup>
        </IonCardContent>
        {answerChecked ? nextButton() : applyButton()}
      </>
    )
  }

  const summary = () => {
    return (
      <>
        <IonCardHeader>
            {/* <IonText>{points}pkt</IonText> */}
            <IonTitle>{`Your score: ${Math.round((points/questions.length*100 + Number.EPSILON) * 100) / 100}%`}</IonTitle>
            <IonText>{`For that quiz you received ${points} points!`}</IonText>
        </IonCardHeader>

        <IonCardContent>
          {history.map((h, i) => {
            return(
              <IonCard style={h.selected === h.correct_answer ? {background: 'springgreen'} : {background: 'lightcoral'}} key={i}>

                <IonCardHeader>
                  <IonItem lines="full">
                    <div className="questionsText">
                      {h.question}
                    </div>
                  </IonItem>
                </IonCardHeader>

                <IonCardContent>
                  {h.selected === h.correct_answer ?
                    <IonItem lines="none" detail={false}>
                      <IonIcon slot="start" icon={checkmark} />
                      <div className="questionsText">
                        <IonText >{h.selected.toString()}</IonText>
                      </div>
                    </IonItem> :
                    <>
                      <IonItem lines="none" detail={false}>
                        <IonIcon slot="start" icon={checkmark} />
                        <div className="questionsText">
                          <IonText >{h.correct_answer.toString()}</IonText>
                        </div>
                      </IonItem>
                      <hr></hr>
                      {/* <IonItemDivider></IonItemDivider> */}
                      <IonItem lines="none" detail={false}>
                        <IonIcon slot="start" icon={close} />
                        <div className="questionsText">
                          <IonText >{h.selected.toString()}</IonText>
                        </div>
                      </IonItem>
                    </>
                  }
                </IonCardContent>
              </IonCard>
            )
          })}

        </IonCardContent>
        <IonButton routerLink={"/quizchoice"} > {/*onClick={() => setView('info')}*/}
          Go back to quizes
        </IonButton>
      </>
    )
  }

  return(
    <IonCard>
      {quizOver ? summary() : quiz()}
      <IonToast
        isOpen={toastVisible}
        onDidDismiss={() => setToastVisible(false)}
        message={toastMessage}
        position="middle"
        color={toastColor}
      />
    </IonCard>
  )
}

export default TriviaQuestions;