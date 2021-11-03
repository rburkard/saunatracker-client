import {
  DbCustomUser,
  DbGame,
  DbParty,
  DbPartyTemplate,
  DbPartyTheme,
  DbTeam,
} from "generated/database.types"
import * as ApiActions from "shared/actions/api.actions"

// export type DataState = {
//   isRequested: boolean
//   games: undefined | Array<DbGame>
//   results: undefined | Record<string, Record<string, number>>
//   teams: undefined | Array<DbTeam>
//   partyThemes: undefined | Array<DbPartyTheme>
//   partyTemplates: undefined | Array<DbPartyTemplate>
//   currentParty: undefined | DbParty
//   currentUser: undefined | DbCustomUser
//   currentUserParties: undefined | Array<DbParty>
// }

// const initialDataState: DataState = {
//   isRequested: false,
//   games: undefined,
//   results: undefined,
//   teams: undefined,
//   partyThemes: undefined,
//   partyTemplates: undefined,
//   currentParty: undefined,
//   currentUser: undefined,
//   currentUserParties: undefined,
// }

// type Action =
//   | typeof ApiActions.getResults.action.success
//   | typeof ApiActions.getTeams.action.success
//   | typeof ApiActions.getPartyThemes.action.success
//   | typeof ApiActions.getPartyTemplates.action.success
//   | typeof ApiActions.getGamesByTheme.action.success
//   | typeof ApiActions.signUp.action.success
//   | typeof ApiActions.deleteTeam.action.success
//   | typeof ApiActions.createParty.action.success
//   | typeof ApiActions.createUser.action.success
//   | typeof ApiActions.getPartiesByUser.action.success

// export const dataReducer = (
//   state: DataState = initialDataState,
//   action: Action
// ): DataState => {
//   switch (action.type) {
//     case ApiActions.getResults.types.success:
//       return {
//         ...state,
//         results: action.payload,
//       }
//     case ApiActions.getTeams.types.success:
//       return {
//         ...state,
//         teams: action.payload,
//       }
//     case ApiActions.getPartyThemes.types.success:
//       return {
//         ...state,
//         partyThemes: action.payload,
//       }
//     case ApiActions.getPartyTemplates.types.success:
//       return {
//         ...state,
//         partyTemplates: action.payload,
//       }
//     case ApiActions.getGamesByTheme.types.success:
//       return {
//         ...state,
//         games: action.payload,
//       }
//     case ApiActions.getPartiesByUser.types.success:
//       return {
//         ...state,
//         currentUserParties: action.payload,
//       }

//     case ApiActions.signUp.types.success:
//       return {
//         ...state,
//         teams: [...(state.teams || []), action.payload.team],
//       }
//     case ApiActions.deleteTeam.types.success:
//       return {
//         ...state,
//         teams: state.teams?.filter(team => team._id !== action.payload.teamId),
//       }
//     case ApiActions.createParty.types.success:
//       return {
//         ...state,
//         currentParty: action.payload.party,
//       }
//     case ApiActions.createUser.types.success:
//       return {
//         ...state,
//         currentUser: action.payload.user,
//       }
//     default:
//       return state
//   }
// }
