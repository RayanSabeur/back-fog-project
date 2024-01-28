import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import {applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root.reducer';
import { getUser } from './actions/user.actions';
import { getGames } from './actions/getgames.actions';



const store = createStore(
  rootReducer,
   composeWithDevTools(applyMiddleware(thunk)) //composeWithDevTools nous permet de travailler dans console du navigateur, thunk c une middleware pour faire des requete async avec redux
); //rootReducer c'est notre store, on va y stocker TOUS nos reducer, en appelant notre combine reduceur en tant que rootreducer
store.dispatch(getUser()); //on vient de se faire un get de tous les user quand on lance l'appli
store.dispatch(getGames());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>  
    <App />
  </Provider>,
);

