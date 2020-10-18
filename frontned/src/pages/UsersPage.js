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

const UsersPage = (props) => {

  const [users, setUsers] = useState();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)

    usersService
    .getAll()
    .then(receivedUsers => {
      setUsers(receivedUsers.filter(u => {return u.username !== user.username}))
    })
  }, []);

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {
          users ?
          <>
            {users.map((u, i) => {
              return (
                <IonItem button routerLink={`/users/${u.id}`}>
                  <IonText>{u.username}</IonText>
                </IonItem>
              )
            })}
          </> : <IonText>loading</IonText>
        }
      </IonContent>

    </IonPage>
  )
}

export default UsersPage;