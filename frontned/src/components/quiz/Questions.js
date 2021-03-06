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

const Questions = ({quiz, id, setView,}) => {
  const [questions, setQuestions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selected, setSelected] = useState([]);
  const [points, setPoints] = useState(0);

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizOver, setQuizOver] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);

  const [rating, setRating] = useState(0);

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

  const apply = () => {
    // if(selected.map((s, i) => s ? questions[counter].answers[i] : s).filter(s => {return s ? true : false}).every(v => questions[counter].valid.indexOf(v) >= 0)) {
    if(arraysEqual(selected.map((s, i) => s ? questions[counter].answers[i] : s).filter(s => {return s ? true : false}), questions[counter].valid)) {
      console.log('dobra odpowiedz')
      setPoints(p => p+1)
    }

    if(selected.map(s => s? 1 : 0).reduce((a, c, i, ar) => a + c) === 0) {
      setTimeoutedToast('Check answer', 'danger' )
      return
    }

    const historyItem ={
      pytanie: questions[counter].pytanie,
      image: questions[counter].image,
      selected: selected.map((s, i) => s ? questions[counter].answers[i] : s).filter(e => {return e ? true : false }),
      valid: questions[counter].valid
    }

    setAnswerChecked(true)
    setHistory(h => h.concat(historyItem))
  }

  const next = () => {
    if(counter+1 !== questions.length) {

      setCounter(c => c+1)
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
        {counter+1 === questions.length ? 'go to summary' : 'next'}
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
          <IonText>{`${counter+1}/${questions.length}`}</IonText>
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


  const updateQuizStats = () => {
    quizPreviewsService
    .update(quiz.id, {rating: rating})
    .catch(e => {
      console.error(e)
    })

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    let user = JSON.parse(loggedUserJSON)

    const newPoints = {
      points: Math.floor((points/questions.length*100))
    }

    usersService.setToken(user.token)
    usersService
    .updatePoints(newPoints)
    .then((res) => {
      if(res.success) {
        user.points += newPoints.points
        window.localStorage.clear()
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
      }
    })

    let historySet = new Set(user.history)
    const oldLength = historySet.size
    historySet.add(quiz.id)
    const newLength = historySet.size

    if (oldLength !== newLength) {
      const newHistory = {
        history: Array.from(historySet)
      }
      user.history = Array.from(historySet)
      usersService
      .updateHistory(newHistory)
      .then(() => {
        window.localStorage.clear()
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
      })
    }

    setView('info')
  }

  const changeRating = (r) => {
    setRating(r)
  }

  const summary = () => {
    return (
      <>
        <IonCardHeader>
            <IonTitle>{`Your score: ${Math.round((points/questions.length*100 + Number.EPSILON) * 100) / 100}%`}</IonTitle>
            <IonText>{`For that quiz you received ${Math.floor((points/questions.length*100))} points!`}</IonText>
        </IonCardHeader>

        <IonCardContent>


          {history.map((h, i) => {
            return(
              <IonCard style={arraysEqual(h.selected, h.valid) ? {background: 'springgreen'} : {background: 'lightcoral'}} key={i}>

                <IonCardHeader>
                  <img onClick={() => fullscreen(h.image)} src={h.image} alt=""></img>
                  <IonItem lines="full">
                    <div className="questionsText">
                      {h.pytanie}
                    </div>
                  </IonItem>
                </IonCardHeader>

                <IonCardContent>
                  {arraysEqual(h.selected, h.valid) ?
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
                          <IonText >{h.valid.toString()}</IonText>
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
        <div id='starRating'>
          <StarRatings
            rating={rating}
            starRatedColor="orange"
            changeRating={changeRating}
            numberOfStars={5}
            starDimension="40px"
            starSpacing="10px"
          />
        </div>

        <IonButton onClick={updateQuizStats} routerLink={"/quizchoice"} > {/*onClick={() => setView('info')}*/}
          Go back to quizes
        </IonButton>
      </>
    )
  }

  return(
    <IonCard>
      <h1>points{points}</h1>
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

export default Questions;