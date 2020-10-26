import React, {useState, useEffect} from 'react'

import {
  IonNote,
  IonGrid, IonCol, IonRow,
  IonIcon, IonLabel, IonItem, IonTitle
} from '@ionic/react';

import './UserInfo.css'
import { happy, help  } from 'ionicons/icons';

const UserInfo = ({user}) => {

  const [points, setPoints] = useState(0);
  const [quizes, setQuizes] = useState(0);

  const [dummy, setDummy] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    let user = JSON.parse(loggedUserJSON)
    setPoints(user.points)
  }, [dummy]);

  return (
    <div id="userInfo">
      <img id="userImage" src="https://i1.wp.com/japonistyka.orient.uw.edu.pl/wp-content/uploads/2019/08/portrait-square-03.jpg"></img>
      <IonTitle id="usernameNote">{user.username}</IonTitle>
      <IonGrid id="grid">
        <IonRow>
          <IonCol>
            {/* <IonItem routerLink={'/welcome'} routerDirection="none" className="userInfoPerks" lines="none" detail={false}> */}
            <IonItem onClick={() => setDummy(d => !d)} className="userInfoPerks" lines="none" detail={false}>
              <IonIcon slot="start" icon={happy} />
              <IonLabel>points</IonLabel>
              <IonLabel>{points}</IonLabel>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem routerLink={'/userpanel'} routerDirection="none" lines="none" className="userInfoPerks" lines="none" detail={false}>
              <IonIcon slot="start" icon={help} />
              <IonLabel>my quizes</IonLabel>
              <IonLabel>234</IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
  </div>
   )
 }

 export default UserInfo