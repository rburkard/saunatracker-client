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
import {
  getGamesSelector,
  getTeamIdSelector,
  getTeamOptionsSelector,
} from "shared/selectors/selectors"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { enterResult } from "shared/actions/api.actions"
import { setTeam } from "shared/actions/view.actions"

export default function Scoreform() {
  const history = useHistory()
  const dispatch = useDispatch()

  const games = useSelector(getGamesSelector)
  const teams = useSelector(getTeamOptionsSelector)
  const teamId = useSelector(getTeamIdSelector)

  const allGames = (games || []).map(t => ({
    label: t.name,
    value: t._id,
  }))

  const [gameInput, setSelectedGame] = React.useState<string>()
  const [scoreInput, setScore] = React.useState<string>("")

  const handleSubmit = async () => {
    if (teamId !== undefined && gameInput !== undefined) {
      dispatch(
        enterResult.call({
          json: {
            teamId: teamId,
            gameId: gameInput,
            value: Number(scoreInput),
          },
        })
      )
    }
    setSelectedGame(undefined)
    setScore("")
  }

  if (teams === undefined || allGames === undefined) {
    return <div>loading</div>
  }

  console.log(teamId, teams)

  return (
    <div>
      <div className="app-container">
        <ReactNotification />
      </div>
      <ContentWrapper
        style={{
          background:
            "linear-gradient(180deg,rgba(0, 0, 0, 1) 0%,rgba(81, 60, 175, 0.858) 50%,rgba(0, 0, 0, 1) 100%)",
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
        <h2>Play game, enter points</h2>
        <FormContainer>
          <FormEntry>
            <p>Team:</p>
            <Dropdown
              value={teams.find(o => o.value === teamId)}
              options={teams}
              onChange={v => {
                dispatch(setTeam(v.value))
              }}
              placeholder="Please select"
            />
          </FormEntry>
          <FormEntry>
            <p>Game:</p>
            <Dropdown
              value={allGames.find(o => o.value === gameInput)}
              options={allGames}
              onChange={v => {
                setSelectedGame(v.value)
              }}
              placeholder="Please select"
            />
            <p style={{ fontSize: 16, color: "#B3B3B3", marginTop: 8 }}>
              You can play all non-guessing games multiple times to improve your
              score.
            </p>
          </FormEntry>
          <FormEntry>
            <p>Score:</p>
            <input
              maxLength={6}
              value={scoreInput}
              style={{ padding: 8 }}
              type="text"
              onChange={event => {
                setScore(event.target.value)
              }}
              placeholder="Psst.. don't cheat"
            />
            <p style={{ fontSize: 16, color: "#B3B3B3" }}>
              All timed results are entered as seconds rounded to the nearest
              0.1
            </p>
            <p style={{ fontSize: 16, color: "#B3B3B3" }}>
              You can input decimals e.g. 23.5
            </p>
          </FormEntry>
          <Button
            disabled={
              !teamId ||
              !gameInput ||
              isNaN(Number(scoreInput)) ||
              scoreInput === "" ||
              scoreInput === "0" ||
              Number(scoreInput) < -1 ||
              Number(scoreInput) > 1000
            }
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              history.push("/results")
            }}
          >
            Go To Results
          </Button>
        </FormContainer>
      </ContentWrapper>
    </div>
  )
}
