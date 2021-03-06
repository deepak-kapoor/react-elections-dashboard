import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
require('file?name=[name].[ext]!./index.html');

render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('app')
);