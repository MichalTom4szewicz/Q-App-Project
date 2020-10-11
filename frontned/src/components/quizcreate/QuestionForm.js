import React, {useState} from 'react'

import {
  IonRadioGroup,
  IonRadio,
  IonToast,
  IonLabel,
  IonInput,
  IonItem,
  IonCard,
  IonButton, IonBadge, IonCheckbox
} from '@ionic/react';

import './QuestionForm.css'


const QuestionForm = ({setQuestions, setCanRedirect, questions}) => {

  const [question, setQuestion] = useState('')

  const [image, setImage] = useState('');

  const [answer, setAnswer] = useState('')
  const [answers, setAnswers] = useState(new Set())

  const [correct, setCorrect]= useState(new Set())

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

  const addAnswer = () => {

    if(answer === '') {
      setTimeoutedToast('Cannot add empty answer', 'danger')
      return
    }

    setAnswers(a => a.add(answer))
    setAnswer('')
  }

  const deleteAnswer = (an) => {

    setAnswers(answers => new Set(Array.from(answers).filter(a => {return a != an })))
    setAnswer('')
    setCorrect(new Set())
  }

  const addQuestion = () => {

    if(question === '') {
      setTimeoutedToast('Question cannot be empty', 'danger')
      return
    }
    if(Array.from(answers).length < 2) {
      setTimeoutedToast('Question must contain at least 2 answers', 'danger')
      return
    }
    if(correct.size === 0) {
      setTimeoutedToast('Choose at least one correct answer', 'warning')
      return
    }

    const q = {
      pytanie: question,
      image: image,
      valid: Array.from(correct),
      answers: Array.from(answers)
    }

    if(Array.from(questions).length === 1) setCanRedirect(true)

    setQuestions(questions => questions.add(q))
    setAnswer('')
    setAnswers(new Set())
    setQuestion('')
    setCorrect(new Set())
    setImage('')

    setTimeoutedToast('Dodano pytanie', 'success')
  }

  const selectCorrect = (a) => {
    let newSet = correct
    if(newSet.has(a)) {
      newSet.delete(a)
      setDummy(d => !d)
    } else {
      newSet.add(a)
      setTimeoutedToast(`${a} is set as correct answer`, 'success')
      setDummy(d => !d)
    }
    setCorrect(newSet)
  }

  return(
    <IonCard>
      <IonBadge color={Array.from(questions).length < 2 ? 'warning' : 'success'}>{`${Array.from(questions).length} questions`}</IonBadge>

      <IonItem>
        <IonInput value={question} placeholder="Question" onIonChange={e => setQuestion(e.target.value)} clearInput/>
      </IonItem>

      <IonItem>
        {Array.from(answers).length === 0 ?  <IonLabel position="stacked">No answers for that question yet</IonLabel> :
          // <IonRadioGroup id="answersRadio" value={selectedRadio} onIonChange={e => setSelectedRadio(e.detail.value)}>
          <>
            {Array.from(answers).map((a, i) => {
              return (
                <IonItem className="answerItem" key={i} onClick={() => selectCorrect(a)} button>
                  <IonLabel  className="answerLabel">{a}</IonLabel>
                  <IonCheckbox slot="start" value={a} checked={Array.from(correct).indexOf(a) > -1 ? true : false}></IonCheckbox>
                  <IonButton slot="end" color="danger" id="del" onClick={() => deleteAnswer(a)}>X</IonButton>
                </IonItem>
              )
            })}
          </>
        }
      </IonItem>

      <IonItem>
        <IonInput className="addAnswer" value={answer} placeholder="Answer" onIonChange={e =>setAnswer(e.target.value)} />
        <IonButton type="submit" className="addAnswer" onClick={addAnswer}>+</IonButton>
      </IonItem>

      <IonItem>
        <IonInput value={image} placeholder="Image - non mandatory" onIonChange={e => setImage(e.target.value)} clearInput/>
      </IonItem>

      <img src={image} alt="" width="100%"></img>

      <IonButton id="addQuestion" onClick={addQuestion}>Add question</IonButton>

      {Array.from(correct).map((c, i) => {
        return(
          <p key={i}>{c}</p>
        )
      })}

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

export default QuestionForm;