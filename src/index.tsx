import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import reportWebVitals from "reportWebVitals";
import Amplify from "aws-amplify";
import config from "aws-exports";
import { createGlobalStyle } from "styled-components";

Amplify.configure(config);

const GlobalStyle = createGlobalStyle`
  body {
    background-size: cover;
    image-rendering: crisp-edges;
    background-repeat: no-repeat;
    min-height: 100vh;
    color: white;
    font-family: 'Press Start 2P';
    background: linear-gradient(to top, rgba(0,0,255,1), #ffc0fd);
    }
`;

ReactDOM.render(
  <React.StrictMode>
    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    </style>
    <GlobalStyle />
    <svg
      style={{ position: "fixed", maxHeight: "100%" }}
      viewBox="0 0 1 1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.4"
          numOctaves="1"
          stitchTiles="stitch"
        />
      </filter>
    </svg>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
