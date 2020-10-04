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

  useEffect(() => {
    quizService
    .getOne(id)
    .then(quiz => {
      setQuestions(quiz.questions)

      setLoading(false)
    })

  }, [])

  const apply = () => {
    if(counter+1 !== questions.length) {
      setCounter(c => c+1)
      setHistory(h => h.concat({'selected': selected, 'valid': questions[counter].valid}))
    } else {
      setQuizOver(true)
    }
  }

  const finish = () => {
    setView('info')
  }

  const quiz = () => {
    return (
      <>
        <IonCardHeader>
          <IonText>0pkt</IonText>
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

        <IonButton onClick={apply}>
          apply
        </IonButton>
      </>
    )
  }

  const summary = () => {
    return (
      <>
        <IonCardHeader>
          <IonText>0pkt</IonText>
          <IonText>
            <h4>Summary</h4>
          </IonText>
        </IonCardHeader>

        <IonCardContent>

        </IonCardContent>

        <IonButton routerLink={"/quizchoice"}onClick={finish}>
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