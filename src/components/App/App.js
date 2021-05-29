import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import './App.css';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';


const App = () => {
    return (
        <div className='page'>
              <Switch>
                <Route exact path='/'>
                  <Header/>
                  <Main/>
                  <Footer/>
                </Route>
                <Route exact path='/movies'>
                  <Header/>
                  <Movies/>
                  <Footer/>
                </Route>
                <Route exact path='/saved-movies'>
                  <Header/>
                  <Movies/>
                  <Footer/>
                </Route>
                <Route exact path='/signin'>
                  <Login/>
                </Route>
                <Route exact path='/signup'>
                  <Registration/>
                </Route>
                <Route exact path='/profile'>
                  <Header/>
                  <Profile/>
                </Route>
                <Route path='*'>
                  <NotFound />
                </Route>
              </Switch>
        </div>
    );
};

export default App;
