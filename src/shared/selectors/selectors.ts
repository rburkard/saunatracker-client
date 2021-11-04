import { createSelector } from "reselect"
import { ReduxState } from "shared/reducers/root.reducer"



export const getRecordsSelector = (state: ReduxState) => state.data.records
// export const getTeamsSelector = (state: ReduxState) => state.data.teams
// export const getResultsSelector = (state: ReduxState) => state.data.results
// export const getPartyThemesSelector = (state: ReduxState) =>
//   state.data.partyThemes
// export const getPartyTemplatesSelector = (state: ReduxState) =>
//   state.data.partyTemplates

// export const getCurrentPartySelector = (state: ReduxState) =>
//   state.data.currentParty

// export const getCurrentUserSelector = (state: ReduxState) =>
//   state.data.currentUser

// export const getPartiesByUserSelector = (state: ReduxState) =>
//   state.data.currentUserParties

// export const getTeamIdSelector = (state: ReduxState) => state.view.teamId

// export const getTeamOptionsSelector = createSelector(getTeamsSelector, teams =>
//   (teams || []).map(t => ({
//     label: t.name,
//     value: t._id,
//   }))
// )
