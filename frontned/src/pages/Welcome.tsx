import { IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonButton,
  IonTitle,
  IonToolbar} from '@ionic/react';

import React, {useState, useEffect} from 'react';
import './Welcome.css';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import {Flashlight} from '@ionic-native/flashlight'


const Welcome: React.FC = () => {

  const [flashOn, setFlashOn] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const flashLight = () => {

    setFlashOn( f => !f)

    if(flashOn) {
      Flashlight.switchOff()
    } else {
      Flashlight.switchOn()
    }
  };

  const fullscreen = () => {
    if(imageUrl !== '') {
      PhotoViewer.show(imageUrl, 'My image from url', {share: false});
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Welcome to TMYK</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard>
          {/* <IonButton onClick={flashLight}>
            {flashOn ? 'off' : 'on'}
          </IonButton>
          <IonButton onClick={fullscreen}>
            fullscreen
          </IonButton>
          <input placeholder='url' value={imageUrl} onChange={e => setImageUrl(e.target.value)}/> */}

          {/* <img src="https://pbs.twimg.com/profile_images/929730220902551553/Z0kv0GMx.jpg" alt="quoka"></img> */}

          <div style={{"background": "aliceblue"}}>
            <h3>Terms of service:</h3>
            <ol>
              <li>Be kind</li>
              <li>Don't make admin's life harder</li>
              <li>Create family friendly content</li>
              <li>Make sure your quizes are usefull</li>
              <li>Be honest while solving quizes</li>
            </ol>
          </div>
          <IonCardHeader>
            <IonCardTitle>Welcome to TMYK</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            The more you know... the more you know. Yes. That's it. Create quizes,solve them, score points and the most important learn new information!.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
