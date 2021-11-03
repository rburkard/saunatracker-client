import React from "react"
import logo from "../assets/logo.png"
import "react-dropdown/style.css"
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import {
  ContentWrapper,
  LogoContainer,
  FormContainer,
  Button,
} from "../components/styledcomponents"
import { useHistory } from "react-router-dom"

export default function Home() {
  const history = useHistory()

  return (
    <div>
      <div className="app-container">
        <ReactNotification />
      </div>
      <ContentWrapper
        style={{
          background:
            "linear-gradient(180deg,rgba(0, 0, 0, 1) 0%,rgba(102, 65, 136, 0.858) 50%,rgba(0, 0, 0, 1) 100%)",
        }}
      >
        <LogoContainer>
          {" "}
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={logo}
            alt=""
          />
        </LogoContainer>
        <FormContainer
          style={{ alignItems: "center", maxWidth: 400, textAlign: "center" }}
        >
          <p style={{ marginBottom: 56 }}>No more boring parties.</p>

          <Button
            style={{ maxWidth: 240 }}
            onClick={() => history.push("/create-party")}
          >
            Create free party now 👊
          </Button>
        </FormContainer>
      </ContentWrapper>
    </div>
  )
}
