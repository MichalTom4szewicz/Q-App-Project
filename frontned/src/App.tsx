import Menu from './components/Menu';
import Page from './pages/Page';
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

import Quizchoice from './pages/Quizchoice';
import Quiz from './pages/Quiz'
import Quizcreate from './pages/Quizcreate';

import loginService from './services/login'
import registerService from './services/register'

import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App: React.FC = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")

  const [name, setName] = useState('')


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }

  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )


      loginService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setUsername('')
      setPassword('')
      setErrorMsg(JSON.parse(exception.response.request.response).error)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      const user = await registerService.register({
        username, name,  password,
      })

      setUsername('')
      setName('')
      setPassword('')

      setErrorMsg('successful registration, now you can log in')//JSON.parse(exception.response.request.response).error
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)

    } catch (exception) {
        setUsername('')
        setName('')
        setPassword('')

        const txt = JSON.parse(exception.response.request.response).error
        console.log(txt)
        setErrorMsg(JSON.parse(exception.response.request.response).error)//JSON.parse(exception.response.request.response).error
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
    }
  }

  const loginForm = () => {
    return (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
    )
  }

  const registerForm = (props) => {

    return (
      <RegisterForm
        username={username}
        name={name}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handleNameChange={({ target }) => setName(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleRSubmit={handleRegistration}
      />
    )
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu errorMsg={errorMsg} user={user} loginForm={loginForm} setUser={setUser} registerForm={registerForm}
           setusername={setUsername} setname={setName} setpassword={setPassword} />

          <IonRouterOutlet id="main">
            <Route path="/page/:name" component={Page} exact />
            <Route path='/quizchoice' component={Quizchoice} exact />
            <Route path='/quizchoice/:id' component={Quiz} exact />
            <Route path="/quizcreate" component={Quizcreate} exact={true} />
            <Redirect from="/" to="/page/Main" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
