import {IonList,
  IonListHeader,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonIcon,
  IonCardContent,
  IonCardHeader,
  IonRadio,
  IonRadioGroup,
  IonLabel,
  IonItem,
  IonText,
  IonButton,
  IonMenuButton,
  IonButtons
} from '@ionic/react';

import React, {useState, useEffect} from 'react';


const AdminQuizes = (props) => {

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Quizes</IonTitle>
        </IonToolbar>
      </IonHeader> */}

      <IonContent>
        <h1>quizess from  admin view</h1>
      </IonContent>

    </IonPage>
  );
};

export default AdminQuizes;
