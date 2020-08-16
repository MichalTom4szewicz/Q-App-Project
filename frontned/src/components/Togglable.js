import React, { useState } from 'react'

import {IonItem, IonButton} from '@ionic/react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      <IonItem style={hideWhenVisible}>
        <IonButton onClick={toggleVisibility}>{props.buttonLabel}</IonButton>
      </IonItem>
      <IonItem style={showWhenVisible}>
        {props.children}
        <IonButton onClick={toggleVisibility}>cancel</IonButton>
      </IonItem>
    </>
  )
}

export default Togglable