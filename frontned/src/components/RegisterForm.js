import React from 'react'

import { IonContent,
  IonButtons,
  IonButton,
  IonText,
  IonItem,
  IonHeader,
  IonPage,
  IonTitle,
  IonInput,
  IonToolbar} from '@ionic/react';

const RegisterForm = ({
    handleRSubmit,
    handleUsernameChange,
    handleNameChange,
    handlePasswordChange,
    username,
    name,
    password
   }) => {
   return (
     <>
       {/*<h2>Register</h2>*/}
 
       <form onSubmit={handleRSubmit}>
         <div>
           username
           <input
             value={username}
             onChange={handleUsernameChange}
           />
         </div>
         <div>
           name
           <input
             value={name}
             onChange={handleNameChange}
           />
         </div>
         <div>
           password
           <input
             type="password"
             value={password}
             onChange={handlePasswordChange}
           />
       </div>
         <IonButton type="submit">register</IonButton>
       </form>
     </>
   )
 }
 
 export default RegisterForm