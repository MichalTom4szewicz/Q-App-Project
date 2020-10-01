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


import loginService from '../../services/login'

const LoginForm = ({
  setUser,
  setErrorMsg
}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      loginService.setToken(user.token)

      setUsername('')
      setPassword('')
      setUser(user)
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
    <>
      <form onSubmit={handleLogin}>
        <div>
          <p>username</p>
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
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
        <IonButton type="submit">login</IonButton>
      </form>
    </>
  )
}

export default LoginForm