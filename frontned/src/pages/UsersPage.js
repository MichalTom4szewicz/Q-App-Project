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

import User from '../components/userpage/User'

const UsersPage = (props) => {

  const [choosenUser, setChoosenUser] = useState(undefined);
  const [users, setUsers] = useState();

  const [user, setUser] = useState();
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)

    usersService
    .getAll()
    .then(receivedUsers => {
      // setUsers(receivedUsers.filter(u => {return u.username !== user.username}))
      setUsers(receivedUsers)
    })
  }, []);

  const chooseUser = () => {
    setChoosenUser('user')
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
            <IonTitle onClick={() => setChoosenUser(undefined)}>{`Users ${choosenUser ? '/'+choosenUser.username : ''}`}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {choosenUser === undefined ?
          <>
            {users ?
              <>
                {users.sort((a, b) => {return b.points - a.points}).map((u, i) => {
                  return (
                    <IonItem button onClick={() => setChoosenUser(u) }>
                      <IonText>{(i+1)+"   "+u.username+"   "+ u.points}</IonText>
                    </IonItem>
                  )
                })}
              </> : <IonText>loading</IonText>
            }
          </> :
          <User user={choosenUser} />
        }
      </IonContent>

    </IonPage>
  )
}

export default UsersPage;