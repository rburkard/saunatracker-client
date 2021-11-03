import React from "react"
import logo from "../assets/logo.png"
import "react-dropdown/style.css"
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import { useHistory } from "react-router-dom"
import {
  ContentWrapper,
  LogoContainer,
  FormContainer,
  FormEntry,
  Button,
} from "../components/styledcomponents"
import { useDispatch } from "react-redux"
import { signUp } from "shared/actions/api.actions"

export default function Signup() {
  const history = useHistory()
  const dispatch = useDispatch()

  const [teamName, setTeamName] = React.useState<string>()
  const [teamMemberOne, setMemberOne] = React.useState<string>()
  const [teamMemberTwo, setMemberTwo] = React.useState<string>()

  const handleSubmit = async () => {
    if (
      teamName !== undefined &&
      teamMemberOne !== undefined &&
      teamMemberTwo !== undefined
    ) {
      dispatch(
        signUp.call({
          json: {
            partyId: "partyid",
            name: teamName,
            members: [teamMemberOne, teamMemberTwo],
          },
        })
      )
    }

    history.push("/getstarted")
  }

  return (
    <div>
      <div className="app-container">
        <ReactNotification />
      </div>
      <ContentWrapper
        style={{
          background:
            "linear-gradient(180deg,rgba(0, 0, 0, 1) 0%,rgba(33, 91, 109, 0.858) 50%,rgba(0, 0, 0, 1) 100%)",
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
        <h2>Create a new team</h2>
        <FormContainer>
          <FormEntry>
            <p>Team Name:</p>
            <input
              maxLength={16}
              value={teamName}
              style={{ padding: 8 }}
              type="text"
              onChange={event => {
                setTeamName(event.target.value)
              }}
              placeholder="Go crazy"
            />
          </FormEntry>
          <FormEntry>
            <p>Player One:</p>
            <input
              maxLength={12}
              value={teamMemberOne}
              style={{ padding: 8 }}
              type="text"
              onChange={event => {
                setMemberOne(event.target.value)
              }}
              placeholder="Hello handsome"
            />
            <FormEntry></FormEntry>
            <p>Player Two:</p>
            <input
              maxLength={12}
              value={teamMemberTwo}
              style={{ padding: 8 }}
              type="text"
              onChange={event => {
                setMemberTwo(event.target.value)
              }}
              placeholder="Hi cutie pie"
            />
          </FormEntry>
          <Button
            disabled={!teamName || !teamMemberOne || !teamMemberTwo}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </FormContainer>
      </ContentWrapper>
    </div>
  )
}
