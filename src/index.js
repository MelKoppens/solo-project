require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
// ReactDOM is no longer supported
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './App.scss'

// ReactDOM is no longer supported
// const appElement = document.getElementById('app');
// ReactDOM.render(<App />, appElement);

const root = createRoot(document.getElementById('app'));
root.render(<App />,);