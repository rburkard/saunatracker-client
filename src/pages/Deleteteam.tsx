import React from "react"
import logo from "../assets/logo.png"
import Dropdown from "react-dropdown"
import "react-dropdown/style.css"
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import {
  ContentWrapper,
  LogoContainer,
  FormContainer,
  FormEntry,
  Button,
} from "../components/styledcomponents"
// import { useHistory } from "react-router-dom"
import { getTeamOptionsSelector } from "shared/selectors/selectors"
import { deleteTeam } from "shared/actions/api.actions"
import { useDispatch, useSelector } from "react-redux"

export default function Deleteteam() {
  // Later solve forwarding in saga
  // const history = useHistory()
  const dispatch = useDispatch()

  const [teamInput, setSelectedTeam] = React.useState<string>()

  // Getting all teams from redux state
  const allTeams = useSelector(getTeamOptionsSelector)

  React.useEffect(() => {
    if (teamInput !== undefined) {
      localStorage.setItem("team", teamInput)
    }
  }, [teamInput])

  React.useEffect(() => {
    const defaultTeam = localStorage.getItem("team")
    if (defaultTeam !== null) {
      setSelectedTeam(defaultTeam)
    }
  }, [])

  if (allTeams === undefined) {
    return <div>loading</div>
  }

  return (
    <div>
      <div className="app-container">
        <ReactNotification />
      </div>
      <ContentWrapper>
        <LogoContainer>
          {" "}
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={logo}
            alt=""
          />
        </LogoContainer>
        <h2>Delete Team</h2>
        <FormContainer>
          <FormEntry>
            <p>Team:</p>
            <Dropdown
              value={teamInput}
              options={allTeams}
              onChange={v => {
                setSelectedTeam(v.value)
              }}
              placeholder="Please select"
            />
          </FormEntry>

          <Button
            disabled={!teamInput}
            onClick={() => {
              if (teamInput !== undefined) {
                dispatch(deleteTeam.call({ json: { teamId: teamInput } }))
              }
              setSelectedTeam(undefined)
            }}
          >
            Delete Team
          </Button>
        </FormContainer>
      </ContentWrapper>
    </div>
  )
}
