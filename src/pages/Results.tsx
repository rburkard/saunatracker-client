import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getResults } from "shared/actions/api.actions"
import {
  getGamesSelector,
  getResultsSelector,
  getTeamsSelector,
} from "shared/selectors/selectors"
import styled from "styled-components"
import { computeResults, mapGameToShow } from "./computeResults"

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 32px;
`

const SideContent = styled.div`
  display: flex;
  flex: 0 0 880px;
  height: 100%;
  flex-direction: column;
`

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const LargeBox = styled.div`
  flex: 1;
  max-height: 60px;
  min-height: 30px;
  width: 100%;
  box-shadow: inset 6px 6px 8px 2px rgba(255, 255, 255, 0.2),
    inset -6px -6px 8px 2px rgba(0, 0, 0, 1);
  display: flex;
  align-items: center;
  flex-direction: row;
`

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 0px 8px 16px;
`

const MidContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const GamesBar = styled.div`
  display: flex;
  flex: 0 0 60px;
  width: 100%;
`

const GameScoreContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  max-height: 60px;
  min-height: 30px;
  width: 100%;
`

const GameScoreBox = styled.div`
  display: flex;
  flex: 1 1 240px;
  height: 100%;
`

const GameScoreDetail = styled.div`
  display: flex;
  padding: 4px;
  background-color: #2ac8e0;
  box-shadow: inset 6px 6px 8px 2px rgba(255, 255, 255, 0.2),
    inset -6px -6px 8px 2px rgba(0, 0, 0, 1);
  justify-content: center;
  align-items: center;
`

export default function Results() {
  const dispatch = useDispatch()

  const games = useSelector(getGamesSelector)
  const results = useSelector(getResultsSelector)
  const teams = useSelector(getTeamsSelector)

  React.useEffect(() => {
    dispatch(getResults.call({}))
    const intervalID = setInterval(() => {
      dispatch(getResults.call({}))
    }, 15000)
    return () => {
      clearInterval(intervalID)
    }
  }, [])

  if (
    teams === undefined ||
    games === undefined ||
    results === undefined ||
    teams.some(t => !results[t._id])
  ) {
    return <div style={{ color: "white" }}>loading</div>
  }

  const { computedPoints, totalPoints, totalRankArray, gameRankArray } =
    computeResults({
      games,
      teams,
      results,
    })

  const rankedTeams = teams.map(t => ({
    ...t,
    rank: totalRankArray.findIndex(i => totalPoints[t._id] >= i),
  }))

  const sortedTeams = rankedTeams.sort((a, b) => {
    if (a.rank === undefined && b.rank === undefined) {
      return a.name > b.name ? -1 : 1
    }

    if (a.rank === undefined) {
      return 1
    }

    if (b.rank === undefined) {
      return -1
    }

    return a.rank > b.rank ? 1 : -1
  })

  return (
    <ContentWrapper>
      <SideContent>
        <LargeBox
          style={{
            background: "none",
            boxShadow: "none",
            alignItems: "center",
            flex: "0 0 60px",
            paddingLeft: 16,
          }}
        >
          <h2>Room2Room Tails</h2>
          <h4
            style={{
              marginLeft: 32,
              opacity: 0.8,
            }}
          >
            (Refreshes every 15 seconds)
          </h4>
        </LargeBox>
        <Sidebar>
          {sortedTeams.map((team, i) => (
            <LargeBox
              style={{
                backgroundColor: `rgba(10, 44, 169, ${i % 2 === 0 ? 0.5 : 1})`,
              }}
              key={team._id}
            >
              <DetailBox style={{ flex: "0 0 300px", flexDirection: "row" }}>
                <h2 style={{ marginRight: 8 }}>{team.name}</h2>
              </DetailBox>
              <DetailBox
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderLeft: "1px solid white",
                }}
              >
                {team.members.map((member, mi) => (
                  <h3 style={{ marginRight: 16 }} key={mi}>
                    {member}
                  </h3>
                ))}
              </DetailBox>
              {(totalPoints[team._id] || 0) > 0 && (
                <DetailBox
                  style={{
                    flex: "0 0 120px",
                    flexDirection: "row",
                    borderLeft: "1px solid white",
                    alignItems: "flex-end",
                  }}
                >
                  <h3>
                    Rank:{" "}
                    {totalRankArray.findIndex(i => totalPoints[team._id] >= i) +
                      1}
                  </h3>
                </DetailBox>
              )}
              <DetailBox
                style={{
                  flex: "0 0 200px",
                  flexDirection: "row",
                  borderLeft: "1px solid white",
                  alignItems: "flex-end",
                }}
              >
                <h3>Total points: {(totalPoints[team._id] || 0).toFixed(0)}</h3>
              </DetailBox>
            </LargeBox>
          ))}
        </Sidebar>
      </SideContent>
      <MidContent>
        <GamesBar>
          {games.map((g, i) => (
            <LargeBox
              style={{
                backgroundColor: "#ec3a0b",
                flex: "1 1 240px",
                padding: "0px 0px 8px 16px",
              }}
              key={i}
            >
              <h2>{g.name}</h2>
            </LargeBox>
          ))}
        </GamesBar>
        <GameScoreContent>
          {sortedTeams.map((team, teamIndex) => (
            <Row key={team._id}>
              {games.map((game, i) => (
                <GameScoreBox key={i}>
                  <GameScoreDetail
                    style={{
                      backgroundColor: `rgba(69, 229, 251, ${
                        teamIndex % 2 === 0 ? 0.7 : 1
                      })`,

                      flex: 1,
                      alignItems: "center",
                      padding: "0px 8px 8px 0px",
                    }}
                  >
                    <h3 style={{ textShadow: "0px 1px 3px black" }}>
                      {results[team._id] && results[team._id][game.number]
                        ? mapGameToShow[game.number]
                          ? results[team._id][game.number].toFixed(1)
                          : "???"
                        : ""}
                    </h3>
                  </GameScoreDetail>
                  <GameScoreDetail
                    style={{
                      backgroundColor: `rgba(37, 124, 175, ${
                        teamIndex % 2 === 0 ? 0.7 : 1
                      })`,

                      flex: 2,
                      padding: "4px 0px 8px 0px",
                    }}
                  >
                    {computedPoints[team._id] &&
                      computedPoints[team._id][game.number] && (
                        <h4
                          style={{
                            padding: 4,
                            textShadow: "1px 1px 8px black",
                          }}
                        >
                          Points:{" "}
                          {computedPoints[team._id][game.number].points.toFixed(
                            0
                          )}{" "}
                          <span
                            style={{
                              marginLeft: 4,
                              marginRight: 4,
                              opacity: 0.3,
                            }}
                          >
                            |
                          </span>{" "}
                          #{" "}
                          {gameRankArray[game.number - 1].findIndex(
                            i =>
                              computedPoints[team._id][game.number].points >= i
                          ) + 1}
                        </h4>
                      )}
                  </GameScoreDetail>
                </GameScoreBox>
              ))}
            </Row>
          ))}
        </GameScoreContent>
      </MidContent>
    </ContentWrapper>
  )
}
