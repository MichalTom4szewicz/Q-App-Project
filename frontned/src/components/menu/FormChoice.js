import React, {useState} from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/react';

import './FormChoice.css'

const FormChoice = ({login, register}) => {
  const [visibleForm, setVisibleForm] = useState('login')

  return (
    <>
      {/* <img src="https://images-cdn.9gag.com/photo/anMD9Q5_700b.jpg"></img> */}
      <img src="https://previews.dropbox.com/p/thumb/ABDseiD8c8lb5fOTyQbhsD1Urr758HGxoHq4xZosGNIAcWw3lTfmDGIxBI4Vqia8T9PSTWDMUdDpYvQ1xuBhY7mTXqtqtjXYDNgtOhgfuTBSn5u2c0CKcLmTHSKzK6G8Bemiez6MfXrajMmddkHmpsQ_tIF5h8FkyiL4r-EoweRaFkF66ourVvupdYZXfU9oLzPGgQHeGQCQr0m04L3hTKL8N0mgsfjM6Y1El9ujT9SAXVOmvNWU_1AX1aAyRWtR0y0esdStzUorLn13C28wWMbp_M3oovQElYoQ3Yh-A0nEqWzJTx05F30pDbTBEMZwBQKJeoGQ5MlZI4kfxQTrXSmxDfcGaOmh1XXly9NbmmcsYQ/p.png?fv_content=true&size_mode=5" alt="tmyk"></img>


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