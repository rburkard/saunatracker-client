import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  html {
    margin: 0;
    padding: 0;
    overflow: hidden;
    overflow-y: scroll;
  }

  #root {
    margin: 0;
    padding: 0;
    min-height: 1000px;
    display: flex;
    flex: 1;
  }

  body {
    margin: 0;
    padding: 80px 0 0 0;
    background-color: lightskyblue;
    height: 100vh;
    display: flex;
  }

  * {
    box-sizing: border-box;
  }

  button {
    font-family: Gemunu Libre;
    font-size: 20px;
    font-weight: 300;
    color: black;
  }
`
