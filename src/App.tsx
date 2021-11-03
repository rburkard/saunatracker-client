import React from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import "react-dropdown/style.css"
import "react-notifications-component/dist/theme.css"

import { useDispatch } from "react-redux"
import { Scaffold } from "./components/Scaffold"
import logo from "./assets/logo.png"
import {
  ContentWrapper,
  // LogoContainer,
  // FormContainer,
  // FormEntry,
} from "./components/styledcomponents"
// import { initialize } from "shared/actions/view.actions"
import Home from "pages/Home"

export const App = () => {
  const dispatch = useDispatch()

  const [password, setPassword] = React.useState<string>()

  // React.useEffect(() => {
  //   dispatch(initialize())
  // }, [])

  React.useEffect(() => {
    if (!!password) {
      localStorage.setItem("pw", password || "")
    }
  }, [password])

  React.useEffect(() => {
    const pw = localStorage.getItem("pw")
    if (pw !== null) {
      setPassword(pw)
    } else {
      setPassword("")
    }
  }, [])

  if (password === undefined) {
    return <Scaffold />
  }

  if (password.toLowerCase() !== "powerrangers") {
    return (
      <Scaffold>
        <ContentWrapper>
          <p>Test</p>
        </ContentWrapper>
      </Scaffold>
    )
  }
  return (
    <Scaffold>
      <Route exact path="/" component={Home} />
    </Scaffold>
  )
}
