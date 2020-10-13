import React, {useState, useEffect} from 'react';

import {IonList,IonModal,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonContent,
  IonLabel,
  IonInput,
  IonItem,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from '@ionic/react';

import './UserPreview.css'
import usersService from '../../services/users'

const UserPreview = ({user, setShowPreview}) => {

  return (
    <IonModal isOpen={true}>
        <IonContent>
          <IonCard>
            <IonList>
              <IonItem>
                <IonLabel>id: {user ? user.id : 'loading'}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Name: {user ? user.name : 'loading'}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>username: {user ? user.username : 'loading'}</IonLabel>
              </IonItem>

            </IonList>
            <IonButton onClick={() => setShowPreview(false)}>Close Preview</IonButton>

          </IonCard>
        </IonContent>
      </IonModal>
  );
};

export default UserPreview;
