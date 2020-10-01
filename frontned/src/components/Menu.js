import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonButton,
  IonNote,
} from '@ionic/react';

import React, { useState, useEffect } from 'react';
import {addOutline,mailOutline, mailSharp, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';

import loginService from '../services/login'

const appPages = [
  {
    title: 'Welcome to TMYK',
    url: '/welcome',
    iosIcon: addOutline,
    mdIcon: trashSharp
  },
  {
    title: 'Create QUIZ',
    url: '/quizcreate',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  },
  {
    title: 'Start FUN',
    url: '/quizchoice',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  }
];

const Menu = () => {

  const [visibleForm, setVisibleForm] = useState('login') //login visible, registration not
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")

  const loginForm = () => {
    return (
      <LoginForm
        setErrorMsg={setErrorMsg}
        setUser={setUser}
      />
    )
  }

  const registerForm = () => {
    return (
      <RegisterForm
        setErrorMsg={setErrorMsg}
      />
    )
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>QuizApp</IonListHeader>

          {errorMsg}

          {user === null ?
            <IonItem>
              <IonButton onClick={() => setVisibleForm('login')} color= {visibleForm === 'login' ? "dark" : "light"}>Login</IonButton>
              <IonButton onClick={() => setVisibleForm('register')} color= {visibleForm === 'login' ? "light" : "dark"}>Register</IonButton>
            </IonItem> : ''
          }

          {user === null ?
            <>
              {visibleForm === 'login' ? loginForm() : registerForm()}
            </> :
            <>
              <div>
                <IonNote>{user.username} logged in</IonNote>
                <IonButton routerLink={"/"} onClick={logOut}>log out </IonButton>
              </div>

              {appPages.map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem routerLink={appPage.url} routerDirection="none" lines="none" detail={false}> {/* routerLink nie odswieza/ nie rerenderuje */}
                      <IonIcon slot="start" icon={appPage.iosIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })}
            </>
          }
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
