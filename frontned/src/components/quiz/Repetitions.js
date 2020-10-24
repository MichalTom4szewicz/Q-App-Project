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

  const [dum, setDum] = useState(0);

  const [arr, setArr] = useState([{index: 999, left: 909090}]);

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

  const apply = () => {

    if(selected.map((s, i) => s ? questions[counter].answers[i] : s).filter(s => {return s ? true : false}).every(v => questions[counter].valid.indexOf(v) >= 0)) {
      setPoints(p => p+1)
      let newArr = [...reps];
      newArr[counter] -= 1;
      setReps(newArr);
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
    if(reps.reduce((previousValue, currentValue, index, array) => {
      return previousValue + currentValue;
    }) > 0) {

      const left = reps.map((e, i) => ({left: e, index: i})).filter(e => {return e.left >0})

      const random = Math.floor(Math.random() * left.length);
      setDum(random) ///////////////////////
      setArr(left) /////////////////////

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


  const updateQuizStats = () => {
    quizPreviewsService
    .update(quiz.id, {rating: rating})
    .catch(e => {
      console.error(e)
    })

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    let user = JSON.parse(loggedUserJSON)
    let historySet = new Set(user.history)
    const oldLength = historySet.size
    historySet.add(quiz.id)
    const newLength = historySet.size

    if (oldLength !== newLength) {
      const newHistory = {
        history: Array.from(historySet)
      }
      user.history = Array.from(historySet)
      usersService.setToken(user.token)
      usersService
      .updateHistory(newHistory)
      .then(() => {
        window.localStorage.clear()
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
      })
    }
  }

  const changeRating = (r) => {
    setRating(r)
  }

  const summary = () => {
    return (
      <>
        <IonCardHeader>
            {/* <IonText>{points}pkt</IonText> */}
            <IonTitle>{`Your score: ${Math.round((points/questions.length*100 + Number.EPSILON) * 100) / 100}%`}</IonTitle>
            <IonText>For that quiz you received 10 points!</IonText>
        </IonCardHeader>

        <IonCardContent>


          {history.map((h, i) => {
            return(
              <IonCard style={h.selected.every(v => h.valid.indexOf(v) >= 0) ? {background: 'springgreen'} : {background: 'lightcoral'}} key={i}>

                <IonCardHeader>
                  <img onClick={() => fullscreen(h.image)} src={h.image} alt=""></img>
                  <IonItem lines="full">
                    <div className="questionsText">
                      {h.pytanie}
                    </div>
                  </IonItem>
                </IonCardHeader>

                <IonCardContent>
                  {h.selected.every(v => h.valid.indexOf(v) >= 0) ?
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
      <h1>{dum}</h1>
      {arr.map((e, i) => {
        return (
          <p key={i}>{`${e.index}   ${e.left}`}</p>
        )
      })}
      <hr></hr>
      {reps.map((e, i) => {
        return (
          <p key={i}>{e}</p>
        )
      })}
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