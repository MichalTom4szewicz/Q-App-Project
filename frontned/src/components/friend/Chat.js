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

const ENDOPINT = '192.168.1.19:8080'
import io from 'socket.io-client'
let socket

const Chat = () => {

  const [message, setmessage] = useState();

  useEffect(() => {


    socket.emit('join', user.username, resObject => {
      const status = resObject === user.username ? 'ok' : 'error'
      setMessage(status)
    })

    socket.on(`${user.username}Message`, (arg, callback) => {
      // s.on(`pawelMessage`, (arg, callback) => {

      console.log(`msg from ${arg[0]}: ${arg[1]}`)
      setMessage(arg[1])
    })

    return(() => {
      socket.close()
    })
  }, []);
}

export default Chat;