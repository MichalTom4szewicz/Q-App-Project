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
  IonCheckbox, IonSearchbar, IonFab, IonFabButton
} from '@ionic/react';

import usersService from '../services/users'
import {search, chevronUpSharp } from 'ionicons/icons';
import User from '../components/userpage/User'

const UsersPage = (props) => {

  const [choosenUser, setChoosenUser] = useState(undefined);
  const [users, setUsers] = useState();

  const [user, setUser] = useState();
  const [loggedUser, setLoggedUser] = useState();

  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

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

        {searchBarVisible ? <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value)} showCancelButton="focus"></IonSearchbar> : ''}
      </IonHeader>

      <IonContent>
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setSearchBarVisible(s => !s)}>
            <IonIcon icon={searchBarVisible ? chevronUpSharp : search} />
          </IonFabButton>
        </IonFab>

        {choosenUser === undefined ?
          <>
            {users ?
              <>
                {users.filter(q => {return q.username.includes(searchText)}).sort((a, b) => {return b.points - a.points}).map((u, i) => {
                  return (
                    <IonItem button onClick={() => setChoosenUser(u) }>
                      <IonText>{(i+1)+".   "+u.username+"   points: "+ u.points}</IonText>
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