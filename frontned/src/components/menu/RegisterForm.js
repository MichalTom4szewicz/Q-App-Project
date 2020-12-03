import React, {useState} from 'react'

import { IonContent,
  IonButtons,
  IonButton,
  IonText,
  IonItem,
  IonHeader,
  IonPage,
  IonTitle,
  IonInput,
  IonToolbar
} from '@ionic/react';

import registerService from '../../services/register'

import './RegisterForm.css'

const RegisterForm = ({
    setErrorMsg
 }) => {

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      const user = await registerService.register({
        username, name,  password,
      })

      setUsername('')
      setName('')
      setPassword('')

      setErrorMsg('successful registration, now you can log in')//JSON.parse(exception.response.request.response).error
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)

    } catch (exception) {
      setUsername('')
      setName('')
      setPassword('')

      const txt = JSON.parse(exception.response.request.response).error
      console.log(txt)
      setErrorMsg(JSON.parse(exception.response.request.response).error)//JSON.parse(exception.response.request.response).error
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  return (
    <div id="registerForm">
      <form onSubmit={handleRegistration}>
        <IonItem>
          <IonInput required value={username} placeholder="Username" onIonChange={e => setUsername(e.detail.value)}></IonInput>
        </IonItem>

        <IonItem>
          <IonInput required value={name} placeholder="Password" onIonChange={e => setName(e.detail.value)}></IonInput>
        </IonItem>

        <IonItem>
          <IonInput required  type="password" value={password} placeholder="Repeat password" onIonChange={e => setPassword(e.detail.value)}></IonInput>
        </IonItem>

        <IonButton className="log_regButton" type="submit">sign up</IonButton>
      </form>
    </div>
   )
 }

 export default RegisterForm