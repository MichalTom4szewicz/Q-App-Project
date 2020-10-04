import { IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar} from '@ionic/react';

import React from 'react';
import './Welcome.css';

const Welcome: React.FC = () => {

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
          <img src="https://pbs.twimg.com/profile_images/929730220902551553/Z0kv0GMx.jpg" alt="quoka"></img>
          <IonCardHeader>
            <IonCardTitle>Welcome to TMYK</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            The more you know... the more you know. Yes. That's it. Create quizes,solve them, gain points and the most important learn new information!.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
