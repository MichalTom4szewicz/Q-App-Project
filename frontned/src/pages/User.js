import React, {useState, useEffect} from 'react'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonRadioGroup,
  IonRadio,
  IonicBadge,
  IonText,
  IonToggle,
  IonTitle,
  IonItemDivider,
  IonContent,
  IonCardContent,
  IonItem,
  IonIcon,
  IonButton,
  IonLabel,
  IonBadge,
  IonCardHeader,
  IonToast,
  IonCheckbox
} from '@ionic/react';

import usersService from '../services/users'

const User = (props) => {

  const [user, setUser] = useState();

  let id = props.match.params.id

  useEffect(() => {
    usersService
    .getOne(id)
    .then(receivedUser => {
      setUser(receivedUser)
    })
  }, [id]);

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{user ? `User: ${user.username}` : 'loading'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {
          user ?
          <>
            <IonCard>
              <IonCardContent>
                <IonText>{user.id}</IonText>
                <hr></hr>
                <IonText>{user.name}</IonText>
              </IonCardContent>
            </IonCard>
          </> : <IonText>loading</IonText>
        }
      </IonContent>

    </IonPage>
  )
}

export default User;