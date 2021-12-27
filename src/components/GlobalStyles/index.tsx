import { createGlobalStyle } from "styled-components";
import wave from "img/wave.png";
import wave2 from "img/wave2.png";
import moon from "img/moon.png";

export const GlobalStyle = createGlobalStyle`
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
  background:url(${moon}),url(${wave}),url(${wave2}),linear-gradient(to bottom,#b83cc9 -40%, #f4c8fd 75%, #ecd5bf);
  background-position: 98% 5%, bottom left, bottom right;
  background-attachment: fixed, fixed, fixed, fixed;
  background-repeat:  no-repeat, no-repeat, no-repeat, no-repeat; 
  background-size:  auto 20vh, auto 40vh, auto 40vh, 100% 100%;
  @media (max-width:500px) {
    background:url(${moon}),url(${wave}),linear-gradient(to bottom,#b83cc9 -40%, #f4c8fd 75%, #ecd5bf) !important;
    background-position: 98% 5%, bottom left !important;
    background-repeat:  no-repeat, no-repeat, no-repeat !important;
    background-size: auto 20vh, auto 35vh, 100% 100% !important;
    background-attachment: fixed, fixed, fixed !important;
  }
}
`;
