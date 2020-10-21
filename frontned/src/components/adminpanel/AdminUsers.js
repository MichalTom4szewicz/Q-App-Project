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

  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [accessAlertVisible, setAccessAlertVisible] = useState(false);

  const [choosenUser, setChoosenUser] = useState('');

  const [showPreview, setShowPreview] = useState(false);


  useEffect(() => {
    usersService
    .getAll()
    .then(users => {
      setUsers(users.filter(u => {return u.access !== 'uber'}))
    })
  }, []);

  const selectUser = (user) => {
    setChoosenUser(user)
    setDeleteAlertVisible(true)
  }

  const dismissDeleteAlert = () => {
    setDeleteAlertVisible(false)
    setChoosenUser({})
  }

  const dismissAccessAlert = () => {
    setDeleteAlertVisible(false)
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
    setDeleteAlertVisible(false)
  }

  const changeAccessChoosenUser = () => {

    usersService
    .changeAccess(choosenUser.id, choosenUser.access === 'user' ? 'admin' : 'user')
    .then(alteredUser => {
      // setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      setUsers(us => us.map(u => u.id !== choosenUser.id ? u : alteredUser))
    })

    setUsers(us => us.filter(u => {return u.id !== choosenUser.id}))
    setChoosenUser({})
    setAccessAlertVisible(false)
  }

  return (
    <IonContent>
      {users.map((u, i) => {
        return (
          <IonItem button key={u.id}>
            <IonLabel onClick={() => previewUser(u)}>{u.username}</IonLabel>
            <IonButton onClick={() => selectUser(u)} color="warning">Grant admin</IonButton>
            <IonButton onClick={() => selectUser(u)} color="danger">Delete</IonButton>
          </IonItem>
        )
      })}

      {showPreview ? <UserPreview setShowPreview={setShowPreview} user={choosenUser} /> : ''}

      <IonAlert
        isOpen={deleteAlertVisible}
        onDidDismiss={dismissDeleteAlert}
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

      <IonAlert
        isOpen={accessAlertVisible}
        onDidDismiss={dismissAccessAlert}
        cssClass='my-custom-class'
        // header={'Confirm!'}
        message={choosenUser.access === 'admin' ?
          `U sure u want to degrade ${choosenUser.username}` :
          `U sure u want to grant ${choosenUser.username} an admin?`
        }
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Proceed',
            handler: changeAccessChoosenUser
          }
        ]}
      />
    </IonContent>
  );
};

export default AdminUsers;
