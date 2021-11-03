import React from "react"
import { store } from "react-notifications-component"
import Dropdown from "react-dropdown"
import "react-dropdown/style.css"
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import logo from "../assets/logo.png"
import {
  ContentWrapper,
  LogoContainer,
  FormContainer,
  Button,
  FormEntry,
} from "../components/styledcomponents"

import { getPartyThemesSelector } from "shared/selectors/selectors"
import { getPartyThemes } from "shared/actions/api.actions"

export default function CreatePartyTheme() {
  const history = useHistory()
  const dispatch = useDispatch()

  const partyThemes = useSelector(getPartyThemesSelector)

  const [selectedPartyTheme, setSelectedPartyTheme] = React.useState("")

  React.useEffect(() => {
    dispatch(getPartyThemes.call({}))
  }, [])

  const handleSubmit = async () => {
    try {
      history.push(`/create-party/templates/${selectedPartyTheme}`)
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

  if (partyThemes === undefined) {
    return (
      <div>
        <p>loagind</p>
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
            <p>Select Partytheme:</p>
            <Dropdown
              options={partyThemes.map(theme => ({
                value: theme._id,
                label: theme.name,
              }))}
              onChange={v => {
                setSelectedPartyTheme(v.value)
              }}
              placeholder="Please select"
            />
          </FormEntry>
          <Button disabled={selectedPartyTheme === ""} onClick={handleSubmit}>
            Submit
          </Button>
        </FormContainer>
      </ContentWrapper>
    </div>
  )
}
