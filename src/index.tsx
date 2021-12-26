import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import reportWebVitals from "reportWebVitals";
import Amplify from "aws-amplify";
import config from "aws-exports";
import { createGlobalStyle, keyframes } from "styled-components";
import wave from "img/wave.png";
import wave2 from "img/wave2.png";
import clouds from "img/clouds.png";

Amplify.configure(config);

const cloudMovement = keyframes`
  0% {
    background-position: 50% -15%, 50% 30%, bottom left, bottom right;
  }
  50% {
    background-position: -50000% -15%, -50000% 30%, bottom left, bottom right;
  }
  100% {
    background-position: 50000% -15%, 50000% 30%, bottom left, bottom right;
  }
`

const GlobalStyle = createGlobalStyle`
  html {
    padding: 0px;
    margin: 0px;
  }
  body {
    margin: 0px;
    padding: 0px;
    max-width: 100vw;
    background-size: cover;
    image-rendering: crisp-edges;
    background-repeat: no-repeat;
    min-height: 100vh;
    color: white;
    font-family: 'Press Start 2P';
    background: url(${clouds}),url(${clouds}),url(${wave}),url(${wave2}),linear-gradient(to bottom,#f79263 -40%, #da79e7 50%, #6262fd);
    background-position: 50% -15%, 50% 30%, bottom left, bottom right;
    background-attachment: fixed, fixed,fixed, fixed, fixed;
    background-repeat: repeat-x, repeat-x, no-repeat, no-repeat, no-repeat; 
    background-size: auto 40vh, auto 20vh, auto 40vh, auto 40vh, 100% 100%;
    animation: ${cloudMovement} 60000s infinite linear;
    @media (max-width:500px) {
      background: url(${clouds}),url(${clouds}),url(${wave}),linear-gradient(to bottom,#f79263 -40%, #da79e7 50%, #6262fd) !important;
      background-position: 50% -15%, 50% 30%, left 100% !important;
      background-repeat: repeat-x, repeat-x, no-repeat, no-repeat !important;
      background-size: auto 40vh, auto 20vh, auto 35vh, 100% 100% !important;
      background-attachment: fixed, fixed,fixed, fixed !important;
    }
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    </style>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
