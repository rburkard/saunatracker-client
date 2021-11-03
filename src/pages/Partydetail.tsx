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
  Button,
} from "../components/styledcomponents"
import { DbParty } from "generated/database.types"
import { useParams } from "react-router"

export default function PartyDetail() {
  const history = useHistory()

  const { currentPartyId } = useParams<{ currentPartyId: string }>()

  const [currentParty, setCurrentParty] = React.useState<DbParty>()

  console.log(currentPartyId)

  const getParty = async () => {
    try {
      if (currentPartyId !== undefined) {
        const x = await fetch(
          `http://localhost:3001/api/get_party/?partyId=${currentPartyId}`,
          {
            method: "GET",
          }
        )
        const json = (await x.json()) as DbParty[]
        setCurrentParty(json[0])
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getParty()
  }, [])

  console.log(currentParty)

  const handleSubmit = async () => {
    history.push(`/create-party/details/${currentPartyId}`)
  }

  if (currentParty === undefined) {
    return (
      <div>
        <p>loading</p>
      </div>
    )
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
        <h2>This is your party!</h2>
        <FormContainer>
          <p>Name:</p>
          <p>{currentParty.name}</p>
          <p>Description:</p>
          <p>{currentParty.description}</p>
          <p>Password to join:</p>
          <p>{currentParty.password}</p>
          <Button onClick={handleSubmit}>Edit</Button>
        </FormContainer>
      </ContentWrapper>
    </div>
  )
}
