import React, {useState, useEffect} from 'react'

import { IonCard, IonRadioGroup, IonRadio, IonicBadge, IonText, IonToggle, IonTitle, IonItemDivider, IonContent, IonCardContent, IonItem, IonIcon, IonButton, IonLabel, IonBadge, IonCardHeader} from '@ionic/react';

import {addOutline,checkmark, close, happy,mailOutline, mailSharp, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';

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
      pytanie: questions[counter].pytanie,
      selected: selected,
      valid: questions[counter].valid
    }

    setAnswerChecked(true)
    setHistory(h => h.concat(historyItem))
  }

  const next = () => {
    if(counter+1 !== questions.length) {

      setCounter(c => c+1)
      setSelected("")
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
                <div styles={{wordWrap: 'break-word'}}>
                  {a}
                </div>
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
            {/* <IonText>{points}pkt</IonText> */}
            <IonTitle>{`Your score: ${Math.round((points/questions.length*100 + Number.EPSILON) * 100) / 100}%`}</IonTitle>
            <IonText>For that quiz you received 10 points!</IonText>
        </IonCardHeader>

        <IonCardContent>


          {history.map((h, i) => {
            return(
              <IonCard style={h.valid === h.selected ? {background: 'springgreen'} : {background: 'lightcoral'}} key={i}>

                <IonCardHeader>
                  <IonItem lines="full">
                    <div styles={{height: 'auto', wordWrap: 'break-word'}}>
                      {h.pytanie}
                    </div>
                  </IonItem>
                </IonCardHeader>

                <IonCardContent>
                  {h.valid === h.selected ?
                    <IonItem lines="none" detail={false}>
                      <IonIcon slot="start" icon={checkmark} />
                      <div styles={{wordWrap: 'break-word'}}>
                        <IonText >{h.selected}</IonText>
                      </div>
                    </IonItem> :
                    <>
                      <IonItem lines="none" detail={false}>
                        <IonIcon slot="start" icon={checkmark} />
                        <div styles={{height: 'auto', wordWrap: 'break-word'}}>
                          <IonText >{h.valid}</IonText>
                        </div>
                      </IonItem>
                      <hr></hr>
                      {/* <IonItemDivider></IonItemDivider> */}
                      <IonItem lines="none" detail={false}>
                        <IonIcon slot="start" icon={close} />
                        <div style={{wordWrap: 'break-word', textAlign: 'middle'}}>
                          <IonText >{h.selected}</IonText>
                        </div>
                      </IonItem>
                    </>
                  }
                </IonCardContent>
              </IonCard>
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