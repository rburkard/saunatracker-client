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
import { updateParty } from "shared/actions/api.actions"
import { DbParty } from "generated/database.types"
import { useParams } from "react-router"

export default function PartyDetail() {
  const history = useHistory()
  const dispatch = useDispatch()

  const { currentPartyId } = useParams<{ currentPartyId: string }>()

  const [currentParty, setCurrentParty] = React.useState<DbParty>()

  const [partyName, setPartyName] = React.useState("")
  const [partyDescription, setPartyDescription] = React.useState("")
  const [partyPassword, setPartyPassword] = React.useState("")

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
    dispatch(
      updateParty.call({
        json: {
          _id: currentPartyId,
          name: partyName,
          description: partyDescription,
          password: partyPassword,
        },
      })
    )

    history.push(`/partydetail/${currentPartyId}`)
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
            "linear-gradient(180deg,rgba(0, 0, 0, 1) 0%,rgba(223, 76, 115, 0.858) 50%,rgba(0, 0, 0, 1) 100%)",
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
        <h2>Enter Partydetail</h2>
        <FormContainer>
          <FormEntry>
            <p>Party Name:</p>
            <input
              maxLength={60}
              style={{ padding: 8 }}
              type="text"
              onChange={v => {
                setPartyName(v.target.value)
              }}
              placeholder="Go crazy"
            />
          </FormEntry>
          <FormEntry>
            <p>Description:</p>
            <input
              maxLength={100}
              style={{ padding: 8 }}
              type="text"
              onChange={v => {
                setPartyDescription(v.target.value)
              }}
              placeholder="Oh so useful"
            />
          </FormEntry>
          <FormEntry>
            <p>Password:</p>
            <input
              maxLength={60}
              style={{ padding: 8 }}
              type="text"
              onChange={v => {
                setPartyPassword(v.target.value)
              }}
              placeholder="Psst..."
            />
          </FormEntry>
          <Button onClick={handleSubmit}>Submit</Button>
        </FormContainer>
      </ContentWrapper>
    </div>
  )
}
