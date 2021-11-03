import React from "react"
import "react-dropdown/style.css"
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import {
  ContentWrapper,
  LogoContainer,
  FormContainer,
  Button,
} from "../components/styledcomponents"

export default function Home() {
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
            src={""}
            alt=""
          />
        </LogoContainer>
        <FormContainer
          style={{ alignItems: "center", maxWidth: 400, textAlign: "center" }}
        >
          <p style={{ marginBottom: 56 }}>
            Just imagine that this is the nice landing page
          </p>
          <Button
            style={{
              marginBottom: 56,
              maxWidth: 240,
            }}
          >
            Wait, hype me up first 🔥
          </Button>
          <Button style={{ maxWidth: 240 }}>I'm fucking ready 👊</Button>
        </FormContainer>
      </ContentWrapper>
    </div>
  )
}
