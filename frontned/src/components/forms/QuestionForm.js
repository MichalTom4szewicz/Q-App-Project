import React, {useState} from 'react'

import {
  IonRadioGroup,
  IonRadio,
  IonToast,
  IonLabel,
  IonInput,
  IonItem,
  IonCard,
  IonButton, IonBadge
} from '@ionic/react';

import './QuestionForm.css'


const QuestionForm = ({setQuestions, setCanRedirect, questions}) => {

  const [question, setQuestion] = useState('')

  const [answer, setAnswer] = useState('')
  const [answers, setAnswers] = useState(new Set())

  const [correct, setCorrect]= useState('')

  const [toastMessage, setToastMessage] = useState('')
  const [toastColor, setToastColor] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const [selectedRadio, setSelectedRadio] = useState('');

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

    // setAnswers(a => a.concat(answer))
    setAnswers(a => a.add(answer))
    setAnswer('')
  }

  const deleteAnswer = (an) => {

    setAnswers(answers => new Set(Array.from(answers).filter(a => {return a != an })))
    setAnswer('')
    setCorrect('')
    setSelectedRadio('')
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
    if(correct === '') {
      setTimeoutedToast('Choose correct answer', 'warning')
      return
    }

    const q = {
      pytanie: question,
      valid: correct,
      answers: Array.from(answers)
    }

    if(Array.from(questions).length === 1) setCanRedirect(true)

    setQuestions(questions => questions.add(q))
    setAnswer('')
    setAnswers(new Set())
    setQuestion('')
    setCorrect('')

    setTimeoutedToast('Dodano pytanie', 'success')
  }

  const selectCorrect = (a) => {
    setCorrect(a)
    setTimeoutedToast(`${a} is set as correct answer`, 'success')
    setSelectedRadio(a)
  }

  return(
    <IonCard>
          <IonBadge color={Array.from(questions).length < 2 ? 'warning' : 'success'}>{`${Array.from(questions).length} questions`}</IonBadge>

      <IonItem>
        <IonInput value={question} placeholder="Question" onIonChange={e => setQuestion(e.target.value)} clearInput/>
      </IonItem>

      <IonItem>
        {Array.from(answers).length === 0 ?  <IonLabel position="stacked">No answers for that question yet</IonLabel> :
          <IonRadioGroup id="answersRadio" value={selectedRadio} onIonChange={e => setSelectedRadio(e.detail.value)}>
            {Array.from(answers).map((a, i) => {
              return (
                <IonItem key={i} button>
                  <IonLabel onClick={() => selectCorrect(a)} className="answerLabel">{a}</IonLabel>
                  <IonRadio onClick={() => selectCorrect(a)} slot="start" value={a}/>
                  <IonButton color="danger" id="del" onClick={() => deleteAnswer(a)}>X</IonButton>
                </IonItem>
              )
            })}
          </IonRadioGroup>
        }
      </IonItem>

      <IonItem>
        <IonInput className="addAnswer" value={answer} placeholder="Answer" onIonChange={e =>setAnswer(e.target.value)} />
        <IonButton type="submit" className="addAnswer" onClick={addAnswer}>+</IonButton>
      </IonItem>

      {/* <IonButton id="resetQuestion" onClick={addQuestion}>Add question</IonButton> */}
      <IonButton id="addQuestion" onClick={addQuestion}>Add question</IonButton>

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