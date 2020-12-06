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
import StarRatings from 'react-star-ratings';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import quizPreviewsService from '../../services/quizPreviews'
import usersService from '../../services/users'

import './Questions.css'

const Repetitions = ({reps, setReps, quiz, id, setView,}) => {
  const [questions, setQuestions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selected, setSelected] = useState([]);

  const [loading, setLoading] = useState(true);
  const [quizOver, setQuizOver] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);

  const [toastMessage, setToastMessage] = useState('')
  const [toastColor, setToastColor] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const [dummy, setDummy] = useState(false);


  useEffect(() => {
    setQuestions(quiz.questions)

    let newSelected = []
    for(let i=0; i<quiz.questions[counter].answers.length; i++) {
      newSelected.push(false)
    }
    setSelected(newSelected)

    setLoading(false)
  }, [counter])

  const arraysEqual = (a, b) => {
    if (a == null || b == null)
      return false
    if (a.length !== b.length)
      return false;
    let ca = a.map(e => e)
    let cb = b.map(e => e)
    ca.sort()
    cb.sort()

    for(let i=0; i<ca.length; i++) {
      if(ca[i] !== cb[i])
        return false
    }

    return true;
  }

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

    if(arraysEqual(selected.map((s, i) => s ? questions[counter].answers[i] : s).filter(s => {return s ? true : false}), questions[counter].valid)) {
      let newArr = [...reps];
      newArr[counter] -= 1;
      setReps(newArr);
    }

    if(selected.map(s => s? 1 : 0).reduce((a, c, i, ar) => a + c) === 0) {
      setTimeoutedToast('Check answer', 'danger' )
      return
    }

    setAnswerChecked(true)
  }

  const next = () => {
    if(reps.reduce((previousValue, currentValue, index, array) => {
      return previousValue + currentValue;
    }) > 0) {

      const left = reps.map((e, i) => ({left: e, index: i})).filter(e => {return e.left >0})
      const random = Math.floor(Math.random() * left.length);

      setCounter(left[random].index)
      setSelected([])
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
        {reps.reduce((previousValue, currentValue, index, array) => {
      return previousValue + currentValue;
    }) > 0 ? 'next' : 'go to summary'}
      </IonButton>
    )
  }

  const fullscreen = (url) => {
    PhotoViewer.show(url, 'Image', {share: false});
  }

  const quizz = () => {
    return (
      <>
        <IonCardHeader>
          <IonText>{`repetitions`}</IonText>
          {!loading ? questions[counter].valid.length > 1 ? <IonBadge id="qBadge" color="warning">Multiple choice</IonBadge> : <IonBadge id="qBadge" color="success">Single choice</IonBadge>:'loading'}
          <img onClick={() => fullscreen(!loading ? questions[counter].image : 'loading')} src={!loading ? questions[counter].image : 'loading'} alt=""></img>
          <IonText>
            <h4>{!loading ? questions[counter].pytanie : 'loading'}</h4>
          </IonText>
        </IonCardHeader>

        <IonCardContent>
          {!loading ? questions[counter].answers.map( (a, i) => {
            return (
              <IonItem onClick={() => {
                  let newSelected = selected
                  newSelected[i] = !newSelected[i]
                  setSelected(newSelected)
                  setDummy(d => !d)
                }} key={a}>
                <div style={answerChecked ? questions[counter].valid.indexOf(a) > -1 ? {background: 'springgreen'} : {background: 'lightcoral'} : {}} className="questionsText">
                  {a}
                </div>
                <IonCheckbox slot="start" value={a} checked={selected[i]}></IonCheckbox>
              </IonItem>
            )
          }) : 'loading'}
        </IonCardContent>

        {answerChecked ? nextButton() : applyButton()}
      </>
    )
  }

  const summary = () => {
    return (
      <>
        <IonCardHeader>
          <IonTitle>{`You've finished your training!`}</IonTitle>
        </IonCardHeader>

        <IonCardContent>

          <IonText>Now you are prepared!</IonText>

          <IonButton onClick={() => setView('info')} routerLink={"/quizchoice"}>
            Go back to quizes
          </IonButton>
        </IonCardContent>
      </>
    )
  }

  return(
    <IonCard>
      {quizOver ? summary() : quizz()}
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

export default Repetitions;