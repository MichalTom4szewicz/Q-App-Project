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
import { Vibration } from '@ionic-native/vibration';
import { setTokenSourceMapRange } from 'typescript';

const client = new W3CWebSocket('ws://192.168.1.19:8000');

const FriendPanel = (props) => {

  const [friends, setFriends] = useState([]);

  const [alertVisible, setAlertVisible] = useState(false);

  const [choosenFriend, setChoosenFriend] = useState(undefined);

  const [showPreview, setShowPreview] = useState(false);

  const [messages, setMessages] = useState([]);

  const [yes, setYes] = useState('');

  const [tmp, setTmp] = useState(false);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)

    const oa = user.friends.map(f => {return {friend: f, nowe: 0}})
    console.log(oa)
    setFriends(oa)

    let msgs = user.friends.map(f => ({username: f.username, mgs: []}))
    setMessages(msgs)

  }, []);

  const decFun = usr => {
    let newFriends = friends

    for(let i=0; i<friends.length; i++) {
      if(newFriends[i].friend.username === usr) {
        newFriends[i].nowe = 0
      }
    }

    setFriends(newFriends)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer.type === "message" && dataFromServer.to === user.username) {
        if (user.friends.map(f => f.username).indexOf(dataFromServer.user) >= 0) {

          let newFriends = friends

          for(let i=0; i<friends.length; i++) {
            if(newFriends[i].friend.username === dataFromServer.user) {
              if(choosenFriend !== undefined){
                if(choosenFriend.friend.username !== dataFromServer.user) {
                  newFriends[i].nowe += 1
                }
              } else {
                newFriends[i].nowe += 1
              }
            }
          }

          setFriends(newFriends)


          let newArr = messages
          Vibration.vibrate([300,100,300])
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
    console.log('hej', user.friend.id)
    usersService
    .getOne(user.friend.id)
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



  const fun = () => {
    // LocalNotifications.schedule({
    //   id: 1,
    // })
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
                      <IonItem button onClick={() => {
                        fetchFriend(u)
                        decFun(u.friend.username)
                        }}>
                        <IonText>{u.friend.username}{" "+u.nowe}</IonText>
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
