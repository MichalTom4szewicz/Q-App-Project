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

import usersService from '../../services/users'

const User = ({user}) => {

  // const [user, setUser] = useState();
  const [loggedUser, setLoggedUser] = useState();

  // let id = props.match.params.id

  useEffect(() => {
    // usersService
    // .getOne(user.id)
    // .then(receivedUser => {
    //   setUser(receivedUser)
    // })

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedUser(user)
    }
  }, [user.id]);

  const addFriend = () => {
    const newFriends = {
      friends: loggedUser.friends.concat([{username: user.username, id: user.id}])
    }

    usersService.setToken(loggedUser.token)
    usersService
    .updateFriends(newFriends)
    .then( au => {
      au.token = loggedUser.token
      setLoggedUser(au)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(au)
      )
    })
  }

  const removeFriend = () => {
    const newFriends = {
      friends: loggedUser.friends.filter(f => {return f.id !== user.id})
    }

    usersService.setToken(loggedUser.token)
    usersService
    .updateFriends(newFriends)
    .then( au => {
      setLoggedUser(au)
      au.token = loggedUser.token
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(au)
      )
    })
  }


  const addButton =
  <IonButton color="primary" onClick={addFriend}>{'Add friend'}</IonButton>

  const removeButton =
  <IonButton color="danger" onClick={removeFriend}>{'Remove friend'}</IonButton>

  return(
    <IonContent>
      {
        user && loggedUser ?
        <>
          <IonCard>
            <IonCardContent>
              <IonText>{user.id}</IonText>
              <hr></hr>
              <IonText>{user.name}</IonText>
              <hr></hr>
              {
                loggedUser.friends.map(f => f.id).indexOf(user.id) >= 0 ?
                removeButton :
                addButton
              }
            </IonCardContent>
          </IonCard>
        </> : <IonText>loading</IonText>
      }
    </IonContent>
  )
}

export default User;