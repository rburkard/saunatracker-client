import React from "react"
import { store } from "react-notifications-component"
import "react-dropdown/style.css"
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"

import logo from "../assets/logo.png"
import {
  ContentWrapper,
  LogoContainer,
  FormContainer,
  Button,
  FormEntry,
} from "../components/styledcomponents"

import {
  getCurrentPartySelector,
  getGamesSelector,
} from "shared/selectors/selectors"
import { createParty, getGamesByTheme } from "shared/actions/api.actions"

export default function CreatePartyGames() {
  const dispatch = useDispatch()
  const history = useHistory()

  const { partyThemeId } = useParams<{ partyThemeId: string }>()

  const [selectedGames, setSelectedGames] = React.useState<Array<string>>()

  const games = useSelector(getGamesSelector)

  React.useEffect(() => {
    dispatch(
      getGamesByTheme.call({
        // remove hardcoded id
        query: { partyThemeId },
      })
    )
  }, [])

  const handleSubmit = async () => {
    try {
      if (partyThemeId !== undefined && selectedGames !== undefined) {
        dispatch(
          createParty.call({
            json: {
              name: "",
              description: "",
              userId: "",
              partyThemeId,
              games: selectedGames,
              teams: [],
              password: "",
            },
          })
        )
      }

      history.push(`/signup`)
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

  if (games === undefined) {
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
            <p>Ohh booii, we have some games for you:</p>
            <Select
              isMulti
              options={games.map(game => ({
                value: game._id,
                label: game.name,
              }))}
              onChange={v => {
                setSelectedGames(v.map(obj => obj.value))
              }}
              placeholder="Please select"
            />
          </FormEntry>
          <Button disabled={selectedGames === null} onClick={handleSubmit}>
            Save your party
          </Button>
        </FormContainer>
      </ContentWrapper>
    </div>
  )
}
