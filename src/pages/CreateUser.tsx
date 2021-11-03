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
import { useDispatch, useSelector } from "react-redux"
import { createUser } from "shared/actions/api.actions"
import { getCurrentPartySelector } from "shared/selectors/selectors"

export default function CreateUser() {
  const history = useHistory()
  const dispatch = useDispatch()

  const currentParty = useSelector(getCurrentPartySelector)

  const [userName, setuserName] = React.useState<string>()
  const [email, setEmail] = React.useState<string>()
  const [password, setPassword] = React.useState<string>()

  const handleSubmit = async () => {
    if (
      userName !== undefined &&
      email !== undefined &&
      password !== undefined &&
      currentParty !== undefined &&
      currentParty._id !== undefined
    ) {
      dispatch(
        // get response with userId
        createUser.call({
          json: {
            partyId: currentParty._id,
            name: userName,
            email: email,
            password,
            parties: [currentParty._id],
          },
        })
      )
      history.push(`/create-party/details/${currentParty._id}`)
    }
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
        <h2>Sign up to save and share your party</h2>
        <FormContainer>
          <FormEntry>
            <p>User Name:</p>
            <input
              maxLength={16}
              value={userName}
              style={{ padding: 8 }}
              type="text"
              onChange={event => {
                setuserName(event.target.value)
              }}
              placeholder="Pick a cool name"
            />
          </FormEntry>
          <FormEntry>
            <p>Email:</p>
            <input
              maxLength={12}
              value={email}
              style={{ padding: 8 }}
              type="text"
              onChange={event => {
                setEmail(event.target.value)
              }}
              placeholder="Pls use a real one"
            />
            <FormEntry></FormEntry>
            <p>Password:</p>
            <input
              maxLength={12}
              value={password}
              style={{ padding: 8 }}
              type="text"
              onChange={event => {
                setPassword(event.target.value)
              }}
              placeholder="Psst..."
            />
          </FormEntry>
          <Button
            disabled={!userName || !email || !password}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </FormContainer>
      </ContentWrapper>
    </div>
  )
}
