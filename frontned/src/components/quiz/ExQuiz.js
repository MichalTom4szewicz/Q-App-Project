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
  IonButton,
  IonText
} from '@ionic/react';

import './ExQuiz.css'

import triviaService from '../../services/trivia'

const ExQuiz = ({setTriviaCard}) => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    triviaService
    .getCategories()
    .then(cats => {
      setCategories(cats.trivia_categories)
    })

  }, []);

  return (
    <IonModal isOpen={true}>
        <IonContent>
          <IonCard>
            <IonList>

              {
                categories.map(c => {
                  return (
                    <IonItem key={c.id}>
                      <IonText>{c.name}</IonText>
                    </IonItem>
                  )
                })
              }

            </IonList>
            <IonButton onClick={() => setTriviaCard(false)}>Close Preview</IonButton>

          </IonCard>
        </IonContent>
      </IonModal>
  );
};

export default ExQuiz;
