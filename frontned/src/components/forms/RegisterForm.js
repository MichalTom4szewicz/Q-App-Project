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
    <>
      <form onSubmit={handleRegistration}>
        <div>
          <p>username</p>
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <p>name</p>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <p>password</p>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <IonButton type="submit">register</IonButton>
      </form>
    </>
   )
 }

 export default RegisterForm