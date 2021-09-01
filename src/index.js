import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App.js';
import { AppLogin } from './AppExtra.js';

// https://discordjs.guide/oauth2/#implicit-grant-flow
const fragment = new URLSearchParams(window.location.hash.slice(1));
const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

let loggedIn = !!accessToken;

ReactDOM.render(
  <>
    {loggedIn ? <App authorization={`${tokenType} ${accessToken}`}/> : <AppLogin />}
  </>,
  document.getElementById('root')
);