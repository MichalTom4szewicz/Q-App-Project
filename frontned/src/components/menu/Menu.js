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
  IonHeader,
  IonToolbar, IonTitle, IonRow, IonGrid, IonCol
} from '@ionic/react';

import React, { useState, useEffect } from 'react';
import {addOutline,mailOutline, mailSharp, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserInfo from './UserInfo'
import FormChoice from './FormChoice';

import loginService from '../../services/login'

import './Menu.css';

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
  },
  {
    title: 'Admin Panel',
    url: '/adminpanel',
    iosIcon: warningSharp,
    mdIcon: warningSharp
  }
];

const Menu = () => {
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
       <IonHeader>
        <IonToolbar translucent>
          {user === null ?
            <div>
              <IonTitle>TMYK APP</IonTitle>
            </div> :
            <UserInfo user={user}></UserInfo>
          }
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {errorMsg}

        <div id="con">
          {user === null ?
            < >
              <FormChoice login={loginForm} register={registerForm}/>
            </> :
            <IonList id="inbox-list">
              {appPages.map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    {appPage.title === 'Start FUN' ?
                      <IonItem href={appPage.url} routerDirection="none" lines="none" detail={false}> {/* routerLink nie odswieza/ nie rerenderuje */}
                        <IonIcon slot="start" icon={appPage.iosIcon} />
                        <IonLabel>{appPage.title}</IonLabel>
                      </IonItem> :
                      <IonItem routerLink={appPage.url} routerDirection="none" lines="none" detail={false}> {/* routerLink nie odswieza/ nie rerenderuje */}
                        <IonIcon slot="start" icon={appPage.iosIcon} />
                        <IonLabel>{appPage.title}</IonLabel>
                      </IonItem>
                    }
                  </IonMenuToggle>
                );
              })}
            </IonList>
          }
        </div>

        {user === null ? '' :<IonButton id="logoutButton" routerLink={"/"} color="warning" onClick={logOut}>log out </IonButton>}

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
