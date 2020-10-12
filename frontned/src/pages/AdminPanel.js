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

import quizService from '../services/quizes'

import AdminUsers from '../components/adminpanel/AdminUsers'
import AdminQuizes from '../components/adminpanel/AdminQuizes'

const AdminPanel = (props) => {

  const [currentPage, setCurrentPage] = useState('');

  const tabs =[
    {name: 'Users', icon: 'face'},
    {name: 'Quizes', icon: '???'}
  ]


  const currentComponent = () => {

    let component
    if(currentPage === 'Users') {
      component = <AdminUsers />
    } else if(currentPage === 'Quizes') {
      component = <AdminQuizes />
    }

    return (
      <>
        {component}
      </>
    )
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <IonText onClick={() => setCurrentPage('')}>Admin Panel</IonText>
            {currentPage ? <IonText>{` / ${currentPage}`}</IonText> : '' }
          </IonTitle>

        </IonToolbar>
      </IonHeader>

      <IonContent>
        {currentPage === '' ?
          <>
            {tabs.map((t, i) => {
              return (
                <IonItem button onClick={() => setCurrentPage(t.name)} key={i}>
                  <IonText>{t.name}</IonText>
                </IonItem>
              )})
            }
          </> :
          currentComponent()
      }

      </IonContent>

    </IonPage>
  );
};

export default AdminPanel;
