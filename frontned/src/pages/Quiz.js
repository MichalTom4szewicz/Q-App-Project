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
  IonButtons
} from '@ionic/react';

import React, {useState, useEffect} from 'react';

import quizService from '../services/quizes'

import Questions from '../components/quiz/Questions'

const Quiz = (props) => {

  const [title, setTitle] = useState('')

  const [statsInfo, setStatsInfo] = useState();

  const [view, setView] = useState('info');

  const [id, setId] = useState('');

  useEffect(() => {
    const id = props.match.params.id

    quizService
    .getOne(id)
    .then(quiz => {
      setTitle(quiz.title)
      setId(quiz.id)
      setStatsInfo('some data')
    })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        {view === 'quiz' ? <Questions id={id} setView={setView}/>: 
          <>
            <IonText>Jakies durne statysyki</IonText>
            {statsInfo}

            <IonButton onClick={() => setView('quiz')}>
              Start!
            </IonButton>
          </>
        }
      </IonContent>

    </IonPage>
  );
};

export default Quiz;



// const Quiz = (props) => {

//   const [quiz, setQuiz] = useState({})        //quiz
//   const [q, setQ] = useState(0)               //ile pytan w quizie
//   const [c, setC] = useState(0)               //numer aktualnego pytania
//   const [cQ, setCQ] = useState({})            //aktualne pytanie
//   const [selected, setSelected] = useState(-1)//wybrana odpowiedz
//   const [answers, setAnswers] = useState([])  // odpowiedzi
//   const [odp, setOdp] = useState()            //poprawna odpowiedz

//   const [pts, setPts] = useState(0)           //zdobyte punkty

//   const [applied, setApplied] = useState(false)//czy potwierdzono wybor

//   const [done, setDone] = useState(false)      //czyukonczono quiz

//   const [history, setHistory] = useState([])

//   useEffect(() => {

//     const id = props.match.params.id

//     quizService
//       .getOne(id)
//       .then(initialQuiz => {
//         setQuiz(initialQuiz)
//         setCQ(initialQuiz.questions[c])
//         setAnswers(initialQuiz.questions[c].answers)
//         setOdp(initialQuiz.questions[c].valid)
//         setQ(initialQuiz.questions.length)
//       })
//   }, [])

//   const question = () => {

//     return(
//       <IonCard>
//         <IonCardHeader>
//           <IonText>
//             <h4>{cQ.pytanie}</h4>
//           </IonText>
//         </IonCardHeader>

//         <IonCardContent>
//           <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>

//             {answers.map( a => {return (
//               <IonItem key={a}>
//                 <IonLabel>{a}</IonLabel>
//                 <IonRadio slot="start" value={a}/>
//               </IonItem>
//             )})}
//           </IonRadioGroup>
//         </IonCardContent>

//         <IonButton style={appStyle} onClick={apply}>
//           apply
//         </IonButton>

//         {snbutton()}

//       </IonCard>
//     )
//   }


//   const apply = () => {
//     if(!applied) {

//       setPts(selected === odp ? pts+1 : pts)
//       setApplied(true)
//       setHistory(history.concat({'selected': selected, 'valid': odp}))
//     }
//   }

//   const next = () => {

//     if(c === (q-1)){
//       setDone(true)
//     } else if(applied) {
//       setCQ(quiz.questions[c+1])
//       setC(c+1)
//       setAnswers(quiz.questions[c+1].answers)
//       setOdp(quiz.questions[c+1].valid)
//       setApplied(false)
//     }
//   }

//   const snbStyle ={
//     display: applied ? "block" : "none"
//   }

//   const appStyle = {
//     display: applied ? "none" : "block"
//   }

//   const snbutton = () => (
//     <IonButton style={snbStyle} onClick={next}>
//       {c===(q-1) ? "wynik" : "next"}
//     </IonButton>
//   )

//   let licznik=0;

//   const score = () => (
//     <IonCard>
//       <IonList>
//         <IonListHeader>
//           Przebieg quizu:
//         </IonListHeader>

//         <IonItem>twoja --- prawidlowa</IonItem>

//         {history.map( h => {
//         licznik+=1;
//         return(
//           <IonItem key={h.valid} lines="none" detail={false}>
//             <IonLabel>{licznik}: {h.selected} --- {h.valid}</IonLabel>
//             <IonIcon slot="start" name={checkmarkOutline}></IonIcon>

//           </IonItem>
//         )})}
//       </IonList>

//       <center>
//         <IonText>
//           <h2>Twój wynik to:</h2>
//           <h1>{pts/q*100}%</h1>
//         </IonText>
//       </center>
//       <IonButton routerLink="/quizchoice">Go back to Quizes</IonButton>

//     </IonCard>
//   )

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>{ done ? "Podsumowanie" : "Quiz:"+quiz.title}</IonTitle>
//           {done ? " " : <IonText>
//             <p>points:{pts}</p>
//             <p>{c===(q-1) ? "ostatnie pytanie" : "pytanie "+(c+1)+"/"+q }</p>
//           </IonText> }
//         </IonToolbar>
//       </IonHeader>

//       <IonContent>

//         { done ? score() : question()}

//       </IonContent>

//     </IonPage>
//   );
// };
