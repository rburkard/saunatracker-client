import { GameType, TeamType } from "components/types"

export const keys = <A extends Record<string, unknown>, K extends keyof A>(
  x: A
): Array<K> => Object.keys(x) as Array<K>

type Results = Record<string, Record<string, number>>

const TOTAL_CHOCOLATES = 81
const STRING_LENGTH = 45.3

export const mapGameToShow: Record<string, boolean> = {
  "1": true,
  "2": true,
  "3": true,
  "4": true,
  "5": true,
  "6": true,
  "7": true,
  "8": true,
  "9": true,
  "10": true,
}

const mapGameToValue: Record<string, (value: number) => number> = {
  "1": v => v,
  "2": v => v,
  "3": v => v,
  "4": v => {
    if (v === 312) {
      return 0
    }
    if (v === 321 || 132 || 213) {
      return 2
    }
    return 3
  },
  "5": v => v,
  "6": v => v,
  "7": v => v,
  "8": v => v,
  "9": v => Math.abs(v - TOTAL_CHOCOLATES),
  "10": v => Math.abs(v - STRING_LENGTH),
}

const max = (r: Results, game: string) =>
  keys(r).reduce((acc, k) => {
    if (r[k][game] === undefined) {
      return acc
    }
    const value = mapGameToValue[game](r[k][game])
    return value > acc ? value : acc
  }, 0)

const min = (r: Results, game: string) =>
  keys(r).reduce((acc, k) => {
    if (r[k][game] === undefined) {
      return acc
    }
    const value = mapGameToValue[game](r[k][game])
    return value < acc ? value : acc
  }, 99999)

type ComputedPoints = Record<
  string,
  Record<string, { value: number; points: number; rank: number }>
>

type TotalPoints = Record<string, number>

type TotalRankArray = Array<number>

type GameRankArray = Array<Array<number>>

export const computeResults = (params: {
  teams: Array<TeamType>
  games: Array<GameType>
  results: Results
}): {
  computedPoints: ComputedPoints
  totalPoints: TotalPoints
  totalRankArray: TotalRankArray
  gameRankArray: GameRankArray
} => {
  const bestAndWorstScores: Record<
    string,
    { best: number; worst: number; range: number }
  > = params.games.reduce((acc, g) => {
    const best = min(params.results, `${g.number}`)
    const worst = max(params.results, `${g.number}`)
    return {
      ...acc,
      [`${g.number}`]: {
        best,
        worst,
        range: Math.abs(worst - best),
      },
    }
  }, {})

  console.log(bestAndWorstScores)

  const computedPoints = params.teams.reduce(
    (acc, team) => ({
      ...acc,
      [team._id]: params.games.reduce((acc2, game) => {
        const value = params.results[team._id][`${game.number}`]
        if (value === undefined) {
          return acc2
        }
        const gameRange = bestAndWorstScores[`${game.number}`]["range"]
        return {
          ...acc2,
          [`${game.number}`]: {
            value,
            rank: 1,
            points:
              gameRange === 0
                ? 100
                : Math.abs(
                    100 -
                      Math.floor(
                        (Math.abs(
                          mapGameToValue[game.number](value) -
                            bestAndWorstScores[`${game.number}`]["best"]
                        ) /
                          gameRange) *
                          100
                      )
                  ),
          },
        }
      }, {}),
    }),
    {} as ComputedPoints
  )

  const totalPoints = params.teams.reduce(
    (acc, team) => ({
      ...acc,
      [team._id]: keys(computedPoints[team._id]).reduce(
        (acc, k) => acc + computedPoints[team._id][k].points,
        0
      ),
    }),
    {} as TotalPoints
  )

  const totalRankArray = keys(totalPoints)
    .map(k => totalPoints[k])
    .sort((a, b) => (a > b ? -1 : 1))

  const gameRankArray = params.games.map(g =>
    keys(computedPoints)
      .map(k =>
        computedPoints[k][g.number]
          ? computedPoints[k][g.number].points
          : undefined
      )
      .filter(v => v !== undefined)
      .sort((a, b) => ((a || 0) > (b || 0) ? -1 : 1))
  ) as GameRankArray

  console.log(computedPoints)

  return { computedPoints, totalPoints, totalRankArray, gameRankArray }
}
