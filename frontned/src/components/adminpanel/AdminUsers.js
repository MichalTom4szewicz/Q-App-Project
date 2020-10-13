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
  IonMenuButton,
  IonButtons,
  IonAlert
} from '@ionic/react';

import React, {useState, useEffect} from 'react';

import usersService from '../../services/users'
import UserPreview from './UserPreview';


const AdminUsers = (props) => {

  const [users, setUsers] = useState([]);

  const [alertVisible, setAlertVisible] = useState(false);

  const [choosenUser, setChoosenUser] = useState('');

  const [showPreview, setShowPreview] = useState(false);


  useEffect(() => {
    usersService
    .getAll()
    .then(users => {
      setUsers(users)
    })
  }, []);

  const selectUser = (user) => {
    setChoosenUser(user)
    setAlertVisible(true)
  }

  const dismissAlert = () => {
    setAlertVisible(false)
    setChoosenUser({})
  }

  const previewUser = (user) => {
    setChoosenUser(user)
    setShowPreview(true)
  }

  const deleteChoosenUser = () => {

    usersService
    .remove(choosenUser.id)

    setUsers(us => us.filter(u => {return u.id !== choosenUser.id}))
    setChoosenUser({})
    setAlertVisible(false)
  }

  return (
    <IonContent>
      {users.map((u, i) => {
        return (
          <IonItem button key={u.id}>
            <IonLabel onClick={() => previewUser(u)}>{u.username}</IonLabel>
            <IonButton onClick={() => selectUser(u)} color="danger">Delete</IonButton>
          </IonItem>
        )
      })}

      {showPreview ? <UserPreview setShowPreview={setShowPreview} user={choosenUser} /> : ''}

      <IonAlert
        isOpen={alertVisible}
        onDidDismiss={dismissAlert}
        cssClass='my-custom-class'
        // header={'Confirm!'}
        message={`U sure want to delete ${choosenUser.username}`}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Delete',
            handler: deleteChoosenUser
          }
        ]}
      />
    </IonContent>
  );
};

export default AdminUsers;
