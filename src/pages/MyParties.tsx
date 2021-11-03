import React from "react"
import logo from "../assets/logo.png"
import "react-dropdown/style.css"
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import { ContentWrapper, LogoContainer } from "../components/styledcomponents"
import { useDispatch, useSelector } from "react-redux"
import { getPartiesByUser } from "shared/actions/api.actions"
import { getPartiesByUserSelector } from "shared/selectors/selectors"

export default function MyParties() {
  const dispatch = useDispatch()

  const currentUserId = "61813dbf7af788139e678775"
  const currentUserParties = useSelector(getPartiesByUserSelector)

  React.useEffect(() => {
    dispatch(getPartiesByUser.call({ query: { userId: currentUserId } }))
  }, [])

  if (currentUserParties === undefined) {
    return (
      <div>
        <p>Pls log in</p>
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
        <h2>Your saved parties:</h2>
        {currentUserParties.map(party => (
          <p>{party.name}</p>
        ))}
      </ContentWrapper>
    </div>
  )
}
