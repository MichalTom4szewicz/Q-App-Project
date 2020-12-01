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
  IonRefresher,
  IonRefresherContent,
  IonMenuButton,
  IonButtons,
  IonAlert
} from '@ionic/react';

import React, {useState, useEffect} from 'react';

import usersService from '../services/users'
import User from '../components/friend/User'
// import quizPreviewService from '../services/quizPreviews'
// import QuizPreview from '../components/userpanel/QuizPreview';


const FriendPanel = (props) => {

  const [friends, setFriends] = useState([]);

  const [alertVisible, setAlertVisible] = useState(false);

  const [choosenFriend, setChoosenFriend] = useState(undefined);

  const [showPreview, setShowPreview] = useState(false);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)
    setFriends(user.friends)
  }, []);

  const fetchFriend = user => {
    usersService
    .getOne(user.id)
    .then(u => {
      setChoosenFriend(u);
    })
  }

  const doRefresh = (event) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)
    setFriends(user.friends)
    event.detail.complete();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <IonText>Friends</IonText>
          </IonTitle>

        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {choosenFriend === undefined ?
            <>
              {friends ?
                <>
                  {friends.map((u, i) => {
                    return (
                      <IonItem button onClick={() => fetchFriend(u)}>
                        <IonText>{u.username}</IonText>
                      </IonItem>
                    )
                  })}
                </> : <IonText>loading</IonText>
              }
          </> :
          <User fsetter={setFriends} setter={setChoosenFriend} user={choosenFriend} />
        }

    </IonContent>

    </IonPage>
  );
};

export default FriendPanel;
