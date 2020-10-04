import React, {useState, useEffect} from 'react'

import { IonCard, IonRadioGroup, IonRadio, IonicBadge, IonText, IonToggle, IonTitle, IonItemDivider, IonContent, IonCardContent, IonItem, IonIcon, IonButton, IonLabel, IonBadge, IonCardHeader} from '@ionic/react';


import quizService from '../../services/quizes'

const Questions = ({id, setView}) => {
  const [questions, setQuestions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selected, setSelected] = useState('');
  const [points, setPoints] = useState(0);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [quizOver, setQuizOver] = useState(false);

  const [answerChecked, setAnswerChecked] = useState(false);

  useEffect(() => {
    quizService
    .getOne(id)
    .then(quiz => {
      setQuestions(quiz.questions)

      setLoading(false)
    })

  }, [])

  const apply = () => {

    if(selected === questions[counter].valid) {
      setPoints(p => p+1)
    }

    const historyItem ={
      selected: selected,
      valid: questions[counter].valid
    }

    setAnswerChecked(true)

    setHistory(h => h.concat(historyItem))

    // if(counter+1 !== questions.length) {

    //   setCounter(c => c+1)
    //   setHistory(h => h.concat(historyItem))
    //   setSelected("")
    // } else {
    //   setHistory(h => h.concat(historyItem))
    //   setQuizOver(true)
    // }
  }

  const next = () => {
    if(counter+1 !== questions.length) {

      setCounter(c => c+1)
      // setHistory(h => h.concat(historyItem))
      setSelected("")
      setAnswerChecked(false)
    } else {
      // setHistory(h => h.concat(historyItem))
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
        next
      </IonButton>
    )
  }


  const quiz = () => {
    return (
      <>
        <IonCardHeader>
          <IonText>{points}pkt</IonText>
          <IonText>
            <h4>{!loading ? questions[counter].pytanie : 'loading'}</h4>
          </IonText>
        </IonCardHeader>

        <IonCardContent>
          <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
            {!loading ? questions[counter].answers.map( a => {return (
              <IonItem key={a}>
                <IonLabel>{a}</IonLabel>
                <IonRadio slot="start" value={a}/>
              </IonItem>
            )}) : 'loading'}
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
          <IonText>{points}pkt</IonText>
          <IonText>
            <h4>Summary</h4>
          </IonText>
        </IonCardHeader>

        <IonCardContent>
          {history.map((h, i) => {
            return(
              <IonItem key={i}>
                <IonLabel>selected{h.selected}</IonLabel>
                <IonLabel>valid{h.valid}</IonLabel>
              </IonItem>
            )
          })}

        </IonCardContent>
        <IonButton onClick={() => setView('info')}>
          Go back to quizes
        </IonButton>
      </>
    )
  }

  return(
    <IonCard>
      {quizOver ? summary() : quiz()}
    </IonCard>
  )
}

export default Questions;