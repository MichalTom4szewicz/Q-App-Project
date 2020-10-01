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

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
   }) => {
   return (
     <>
       {/*<h2>Login</h2>*/}

       <form onSubmit={handleSubmit}>
         <div>
           username
           <input
             value={username}
             onChange={handleUsernameChange}
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
         <IonButton type="submit">login</IonButton>
       </form>
     </>
   )
 }

 export default LoginForm