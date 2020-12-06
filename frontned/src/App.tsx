import React, {useState, useEffect} from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, IonInput, IonButton} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Menu from './components/menu/Menu';

import Welcome from './pages/Welcome';
import Quizchoice from './pages/Quizchoice';
import Quiz from './pages/Quiz'
import Quizcreate from './pages/Quizcreate';
import AdminPanel from './pages/AdminPanel'
import TriviaQuiz from './pages/TriviaQuiz'
import UsersPage from './pages/UsersPage'
import UserPanel from './pages/UserPanel'
import FriendsPage from './pages/FriendPanel'
import { w3cwebsocket as W3CWebSocket } from "websocket";


const client = new W3CWebSocket('ws://192.168.1.19:8000');
const App: React.FC = () => {

  const [ddd, setDdd] = useState(false);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">

          <Menu client={client} setter={setDdd}/>

          <IonRouterOutlet id="main">
            <Route path="/welcome" component={Welcome} exact />
            <Route path='/quizchoice' component={() => (<Quizchoice ddd={ddd}/>)} exact />


            <Route path='/quizchoice/:id' component={Quiz} exact/>



            <Route path='/triviaquiz/:category' component={TriviaQuiz} exact />
            <Route path="/quizcreate" component={Quizcreate} exact={true} />
            <Route path="/adminpanel" component={AdminPanel} exact={true} />
            <Route path="/userpanel" component={UserPanel} exact={true} />
            <Route path='/users' component={UsersPage} exact />
            <Route path='/friends' component={() => (<FriendsPage client={client}/>)} exact />
            <Redirect from="/" to="/welcome" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
