import { Endpoints, API, mapEndpointToMethod } from "generated/spec"
import { configureTypeReduxApiCreator } from "frr-redux/lib/frr/rest"

const { createEndpoint } = configureTypeReduxApiCreator<
  API,
  Endpoints,
  typeof mapEndpointToMethod
>(mapEndpointToMethod)

// export const getTeams = createEndpoint()(
//   {
//     request: "GET_TEAMS_REQUEST",
//     success: "GET_TEAMS_SUCCESS",
//     failure: "GET_TEAMS_FAILURE",
//   } as const,
//   Endpoints.GetTeams
// )

// export const getResults = createEndpoint()(
//   {
//     request: "GET_RESULTS_REQUEST",
//     success: "GET_RESULTS_SUCCESS",
//     failure: "GET_RESULTS_FAILURE",
//   } as const,
//   Endpoints.GetResults
// )

// export const getPartyThemes = createEndpoint()(
//   {
//     request: "GET_PARTY_THEMES_REQUEST",
//     success: "GET_PARTY_THEMES_SUCCESS",
//     failure: "GET_PARTY_THEMES_FAILURE",
//   } as const,
//   Endpoints.GetPartyThemes
// )

// export const getPartyTemplates = createEndpoint()(
//   {
//     request: "GET_PARTY_TEMPLATES_REQUEST",
//     success: "GET_PARTY_TEMPLATES_SUCCESS",
//     failure: "GET_PARTY_TEMPLATES_FAILURE",
//   } as const,
//   Endpoints.GetPartyTemplates
// )

// export const getGamesByTheme = createEndpoint()(
//   {
//     request: "GET_GAMES_BY_THEME_REQUEST",
//     success: "GET_GAMES_BY_THEME_SUCCESS",
//     failure: "GET_GAMES_BY_THEME_FAILURE",
//   } as const,
//   Endpoints.GetGamesByTheme
// )

// export const getUser = createEndpoint()(
//   {
//     request: "GET_USER_REQUEST",
//     success: "GET_USER_SUCCESS",
//     failure: "GET_USER_FAILURE",
//   } as const,
//   Endpoints.GetUser
// )

// export const createGame = createEndpoint()(
//   {
//     request: "CREATE_GAME_REQUEST",
//     success: "CREATE_GAME_SUCCESS",
//     failure: "CREATE_GAME_FAILURE",
//   } as const,
//   Endpoints.CreateGame
// )

// export const signUp = createEndpoint()(
//   {
//     request: "SIGN_UP_REQUEST",
//     success: "SIGN_UP_SUCCESS",
//     failure: "SIGN_UP_FAILURE",
//   } as const,
//   Endpoints.SignUp
// )

// export const enterResult = createEndpoint()(
//   {
//     request: "ENTER_RESULT_REQUEST",
//     success: "ENTER_RESULT_SUCCESS",
//     failure: "ENTER_RESULT_FAILURE",
//   } as const,
//   Endpoints.EnterResult
// )

// export const deleteTeam = createEndpoint()(
//   {
//     request: "DELETE_TEAM_REQUEST",
//     success: "DELETE_TEAM_SUCCESS",
//     failure: "DELETE_TEAM_FAILURE",
//   } as const,
//   Endpoints.DeleteTeam
// )

// export const createParty = createEndpoint()(
//   {
//     request: "CREATE_PARTY_REQUEST",
//     success: "CREATE_PARTY_SUCCESS",
//     failure: "CREATE_PARTY_FAILURE",
//   } as const,
//   Endpoints.CreateParty
// )

// export const createUser = createEndpoint()(
//   {
//     request: "CREATE_USER_REQUEST",
//     success: "CREATE_USER_SUCCESS",
//     failure: "CREATE_USER_FAILURE",
//   } as const,
//   Endpoints.CreateUser
// )

// export const createTeam = createEndpoint()(
//   {
//     request: "CREATE_TEAM_REQUEST",
//     success: "CREATE_TEAM_SUCCESS",
//     failure: "CREATE_TEAM_FAILURE",
//   } as const,
//   Endpoints.CreateTeam
// )

// export const updateParty = createEndpoint()(
//   {
//     request: "UPDATE_PARTY_REQUEST",
//     success: "UPDATE_PARTY_SUCCESS",
//     failure: "UPDATE_PARTY_FAILURE",
//   } as const,
//   Endpoints.UpdateParty
// )

// export const getPartiesByUser = createEndpoint()(
//   {
//     request: "GET_PARTIES_BY_USER_REQUEST",
//     success: "GET_PARTIES_BY_USER_SUCCESS",
//     failure: "GET_PARTIES_BY_USER_FAILURE",
//   } as const,
//   Endpoints.GetPartiesByUser
// )
