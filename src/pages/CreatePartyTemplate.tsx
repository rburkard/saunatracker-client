import React from "react"
import { store } from "react-notifications-component"
import Dropdown from "react-dropdown"
import "react-dropdown/style.css"
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import logo from "../assets/logo.png"
import {
  ContentWrapper,
  LogoContainer,
  FormContainer,
  Button,
  FormEntry,
} from "../components/styledcomponents"

import { getPartyTemplatesSelector } from "shared/selectors/selectors"
import { getPartyTemplates } from "shared/actions/api.actions"

export default function CreatePartyTemplate() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { partyThemeId } = useParams<{ partyThemeId: string }>()

  const partyTemplates = useSelector(getPartyTemplatesSelector)

  const [selectedPartyTemplate, setSelectedPartyTemplate] = React.useState("")

  React.useEffect(() => {
    dispatch(getPartyTemplates.call({ query: { partyThemeId } }))
  }, [])

  const handleSubmit = async () => {
    try {
      history.push(
        `/create-party/games/${partyThemeId}/${selectedPartyTemplate}`
      )
    } catch (error) {
      store.addNotification({
        title: "Failed :(",
        message: "Something went wrong, try again",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
        },
      })
      console.log(error)
    }
  }

  if (partyTemplates === undefined) {
    return <div></div>
  }

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
          <FormEntry>
            <p>Select from one of our amazing templates:</p>
            <Dropdown
              options={partyTemplates.map(template => ({
                value: template._id,
                label: template.name,
              }))}
              onChange={v => {
                setSelectedPartyTemplate(v.value)
              }}
              placeholder="Please select"
            />
          </FormEntry>
          <Button
            disabled={selectedPartyTemplate === ""}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </FormContainer>
      </ContentWrapper>
    </div>
  )
}
