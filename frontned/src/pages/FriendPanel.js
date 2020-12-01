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

const client = new W3CWebSocket('ws://127.0.0.1:8000');

const FriendPanel = (props) => {

  const [friends, setFriends] = useState([]);

  const [alertVisible, setAlertVisible] = useState(false);

  const [choosenFriend, setChoosenFriend] = useState(undefined);

  const [showPreview, setShowPreview] = useState(false);

  const [messages, setMessages] = useState([]);

  const [text, setText] = useState('');


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)
    setFriends(user.friends)

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('got reply! ', dataFromServer);
      if (dataFromServer.type === "message") {
        setMessages(m => m.concat(dataFromServer.msg))
      }
    };

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

        <IonTextarea placeholder="here..." value={text} onIonChange={e => setText(e.detail.value)}></IonTextarea>
        {text}

        <IonButton onClick={() => {
          const loggedUserJSON = window.localStorage.getItem('loggedUser')
          const user = JSON.parse(loggedUserJSON)

          client.send(JSON.stringify({
            type: "message",
            msg: text,
            user: user.username
          }));
        }}>click</IonButton>

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
          <User fsetter={setFriends} setter={setChoosenFriend} user={choosenFriend} />
        }

        {messages.map(m => {
          return (
          <p>{m}</p>
          )
        })}

    </IonContent>

    </IonPage>
  );
};

export default FriendPanel;
