import React, {useState} from 'react'

import {
  IonRadioGroup,
  IonRadio,
  IonToast,
  IonLabel,
  IonInput,
  IonItem,
  IonCard,
  IonButton} from '@ionic/react';

const QuestionForm = (props) => {

  const [pytanie, setPytanie] = useState('')

  const [answer, setAnswer] = useState('')
  const [answers, setAnswers] = useState([])

  const [correct, setCorrect]= useState('')

  const [message, setMessage] = useState('')
  const [showToast, setShowToast] = useState(false);

  const [selected, setSelected] = useState('');


  const handlePytanieChange = (event) => {
    setPytanie(event.target.value)
  }
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value)
  }
  const addAnswer = () => {
    setAnswers(answers.concat(answer))
    setAnswer('')
  }

  const addQuestion = () => {
    const q = {
      pytanie: pytanie,
      valid: correct,
      answers: answers
    }

    props.addQuestion(props.questions.concat(q))
    setAnswer('')
    setAnswers([])
    setPytanie('')
    
    setMessage('Dodano pytanie')

    setTimeout(() => {
      setMessage('')
    }, 5000)

    setShowToast(true)

  }

  const clk = (a) => {
    setCorrect(a)
    setMessage(a+" is set as correct answer")
    setShowToast(true)
  }

  const btnStyle = {
    //color: "lightgrey",
    backgroundColor: "yellow"
  }

  return(
    <IonCard>
      

      <IonItem>
        <IonLabel position="floating">Question</IonLabel>
        <IonInput value={pytanie} placeholder="Enter Question" onIonChange={handlePytanieChange} clearInput/>
      </IonItem>
     
      <IonLabel position="floating">Answers</IonLabel>

      <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
            

        {answers.map(a => <IonItem style={btnStyle} key={a} button onClick={() => clk(a)} ><IonLabel>{a}</IonLabel><IonRadio slot="start" value={a}/></IonItem>)}
      </IonRadioGroup>

      {/*answers.map(a => <IonItem style={btnStyle} key={a} button onClick={() => clk(a)} >{a}</IonItem>)*/}

      <IonItem>
        <IonLabel position="floating">Answer</IonLabel>
        <IonInput value={answer} placeholder="Enter Answer" onIonChange={handleAnswerChange} clearInput/>
        <IonButton onClick={() => addAnswer() }>Add!</IonButton>
      </IonItem>

      <IonButton onClick={()=> addQuestion()}>Add Item</IonButton>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={message}
        position="middle"
        duration={1500}
        color="success"       
      />

        
    </IonCard>
  )
    
}

export default QuestionForm;