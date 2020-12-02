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
  IonAlert,
  IonTextarea
} from '@ionic/react';

import React, {useState, useEffect} from 'react';

import usersService from '../services/users'
import User from '../components/friend/User'

import { w3cwebsocket as W3CWebSocket } from "websocket";



const FriendPanel = ({client}) => {

  const [friends, setFriends] = useState([]);

  const [alertVisible, setAlertVisible] = useState(false);

  const [choosenFriend, setChoosenFriend] = useState(undefined);

  const [showPreview, setShowPreview] = useState(false);

  const [messages, setMessages] = useState([]);

  const [yes, setYes] = useState('');


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)
    setFriends(user.friends)

    let msgs = user.friends.map(f => ({username: f.username, mgs: []}))
    setMessages(msgs)

  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer.type === "message" && dataFromServer.to === user.username) {
        if (user.friends.map(f => f.username).indexOf(dataFromServer.user) >= 0) {
          let newArr = messages
          for (let i=0; i<friends.length; i++) {
            if (newArr[i].username === dataFromServer.user) {
              newArr[i].mgs = newArr[i].mgs.concat({txt: dataFromServer.msg, own: false})
              setYes(dataFromServer.msg)
            }
          }
          setMessages(newArr)
        }
      }
    };
  }, [messages]);

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
        {/* {messages.map(m => {
          return (
            <p>{m.username +"   "+ m.mgs.length}</p>
          )
        })} */}

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
                </> : <IonText>loadin</IonText>
              }
          </> :
          <User messages={messages} setMessages={setMessages} client={client} fsetter={setFriends} setter={setChoosenFriend} user={choosenFriend} />
        }
      </IonContent>

    </IonPage>
  );
};

export default FriendPanel;
