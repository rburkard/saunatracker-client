import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  html {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  #root {
    margin: 0;
    padding: 0;
    background-color: black;
    min-height: 1000px;
    display: flex;
    flex: 1;
  }

  body {
    margin: 0;
    padding: 80px 0 0 0;
    background-color: black;
    overflow-y: auto;
    height: 100vh;
    overflow-y: scroll;
    display: flex;
    /* flex: 1;
    height: 100%; */
  }

  * {
    box-sizing: border-box;
  }

  h2 {
    font-family: Gemunu Libre;
    margin: 0px;
    padding: 0px;
    font-size: 30px;
    font-weight: 700;
    color: #ffffff;
  }

  h3 {
    font-family: Gemunu Libre;
    margin: 0px;
    padding: 0px;
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
  }

  h4 {
    font-family: Gemunu Libre;
    margin: 0px;
    padding: 0px;
    font-size: 18px;
    font-weight: 300;
    color: #ffffff;
  }

  p {
    font-family: Gemunu Libre;
    margin: 0px;
    margin-bottom: 8px;
    padding: 0px;
    font-size: 24px;
    font-weight: 300;
    color: #ffffff;
  }

  input {
    font-family: Gemunu Libre;
    margin: 0px;
    margin-bottom: 8px;
    padding: 0px;
    font-size: 18px;
    font-weight: 300;
    color: black;
  }

  .Dropdown-control, .Dropdown-menu {
    font-family: Gemunu Libre;
    font-size: 18px;
    font-weight: 300;
    color: black;
  }

  .notification__title {
    font-family: Gemunu Libre;
    font-size: 22px;
    font-weight: 300;
    color: white;
  }

  .notification__message {
    font-family: Gemunu Libre;
    font-size: 14px;
    font-weight: 300;
    color: white;
  }

  button {
    font-family: Gemunu Libre;
    font-size: 20px;
    font-weight: 300;
    color: black;
  }
`
