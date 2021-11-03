import React from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import "react-dropdown/style.css"
import "react-notifications-component/dist/theme.css"

import { useDispatch } from "react-redux"
import { Scaffold } from "./components/Scaffold"
import Results from "./pages/Results"
import Scoreform from "./pages/Scoreform"
import Signup from "./pages/Signup"
import logo from "./assets/logo.png"
import Getstarted from "./pages/CreatePartyTheme"
import Deleteteam from "./pages/Deleteteam"
import {
  ContentWrapper,
  LogoContainer,
  FormContainer,
  FormEntry,
} from "./components/styledcomponents"
import { initialize } from "shared/actions/view.actions"
import Home from "pages/Home"
import CreatePartyTemplate from "pages/CreatePartyTemplate"
import CreatePartyTheme from "pages/CreatePartyTheme"
import CreatePartyGames from "pages/CreatePartyGames"
import CreateUser from "pages/CreateUser"
import PartyDetail from "pages/Partydetail"
import CreatePartyDetails from "pages/CreatePartyDetails"
import MyParties from "pages/MyParties"

export const App = () => {
  const dispatch = useDispatch()

  const [password, setPassword] = React.useState<string>()

  React.useEffect(() => {
    dispatch(initialize())
  }, [])

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
          <LogoContainer>
            {" "}
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={logo}
              alt=""
            />
          </LogoContainer>
          <h2>It's about</h2> <h2>to go down...</h2>
          <FormContainer>
            <FormEntry style={{ alignItems: "center" }}>
              <p style={{ marginBottom: 24 }}>Enter Password</p>
              <input
                maxLength={15}
                value={password}
                style={{ padding: 8 }}
                type="text"
                onChange={event => {
                  setPassword(event.target.value)
                }}
                placeholder="Search within.."
              />
            </FormEntry>
            {/* <Button disabled={!password}>Submit</Button> */}
          </FormContainer>
        </ContentWrapper>
      </Scaffold>
    )
  }
  return (
    <Scaffold>
      <Route exact path="/" component={Home} />
      <Route exact path="/enterscore" component={Scoreform} />
      <Route exact path="/results" component={Results} />
      <Route exact path="/signup" component={CreateUser} />
      <Route exact path="/delete" component={Deleteteam} />
      <Route exact path="/create-party" component={CreatePartyTheme} />
      <Route
        exact
        path="/create-party/templates/:partyThemeId"
        component={CreatePartyTemplate}
      />
      <Route
        exact
        path="/create-party/games/:partyThemeId/:partyTemplateId"
        component={CreatePartyGames}
      />
      <Route
        exact
        path="/create-party/details/:currentPartyId"
        component={CreatePartyDetails}
      />
      <Route
        exact
        path="/partydetail/:currentPartyId"
        component={PartyDetail}
      />
      <Route exact path="/myparties" component={MyParties} />
    </Scaffold>
  )
}
