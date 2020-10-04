import React, {useState} from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/react';

import './FormChoice.css'

const FormChoice = ({login, register}) => {
  const [visibleForm, setVisibleForm] = useState('login')

  return (
    <>
      <img src="https://images-cdn.9gag.com/photo/anMD9Q5_700b.jpg"></img>
      <IonSegment value={visibleForm} onIonChange={e => setVisibleForm(e.detail.value)}>
        <IonSegmentButton value="login">
          <IonLabel>Login</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="register">
          <IonLabel>Sign up</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      {visibleForm === 'login' ? login() : register()}
    </>
   )
 }

 export default FormChoice