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

import React, { useState } from 'react';
import {addOutline,mailOutline, mailSharp, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';


const appPages = [
  {
    title: 'Main Page',
    url: '/page/Main',
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

const Menu = (props) => {

  const [visibleForm, setVisibleForm] = useState('login') //login visible, registration not

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>QuizApp</IonListHeader>

          {props.errorMsg}

          {props.user === null ?
            <>
            <IonItem>
              <IonButton onClick={() => setVisibleForm('login')} color= {visibleForm === 'login' ? "dark" : "light"}>Login</IonButton>
              <IonButton onClick={() => setVisibleForm('register')} color= {visibleForm === 'login' ? "light" : "dark"}>Register</IonButton>
            </IonItem>
            </> : ''}

          {props.user === null ?
            <>
              {visibleForm === 'login' ? props.loginForm() : props.registerForm()}
            </> :
            <>
              <IonNote>{props.user.username} logged in</IonNote>
              <IonButton routerLink={"/"} onClick={event => {
                window.localStorage.clear()
                props.setUser(null)
              }}> log out </IonButton>

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
