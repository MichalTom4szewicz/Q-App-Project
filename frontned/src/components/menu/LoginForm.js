import React, {useState, useEffect} from 'react'

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

import './LoginForm.css'

import loginService from '../../services/login'

const LoginForm = ({
  setUser,
  setErrorMsg, client
}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      loginService.setToken(user.token)
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setUser(user)
      }, 200);
    } catch (exception) {
      setUsername('')
      setPassword('')
      setErrorMsg(JSON.parse(exception.response.request.response).error)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  useEffect(() => {
    return(() => {
    })
  }, []);

  return (
    <div id="loginForm">
      <form onSubmit={handleLogin}>
        <IonItem>
          <IonInput required value={username} placeholder="Username" onIonChange={e => setUsername(e.detail.value)}></IonInput>
        </IonItem>

        <IonItem>
          <IonInput required  type="password" value={password} placeholder="Password" onIonChange={e => setPassword(e.detail.value)}></IonInput>
        </IonItem>

        <IonButton className="log_regButton" type="submit">login</IonButton>
      </form>
    </div>
  )
}

export default LoginForm