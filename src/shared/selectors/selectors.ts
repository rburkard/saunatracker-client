import { createSelector } from "reselect"
import { ReduxState } from "shared/reducers/root.reducer"



const fn = () => 3

const fn2 = () =>{
    return 3
}

const fn3 = () =>{
    return { value: 1 }
}

const fn4 = () =>({ value: 1 })



export const getRecordsSelector = (state: ReduxState) => state.data.records

export const getRecordsDaySelector = createSelector(getRecordsSelector, records => {
    const days = [0,1,2,3,4,5,6]
    return days.map(day => ({
        day,
        recs: (records || []).filter(record => new Date(record.timestamp).getDay() === day)
    }))
}
)

export const getPrevRecordsSelector = (state: ReduxState) => state.data.prevRecords


export const getPrevRecordsDaySelector = createSelector(getPrevRecordsSelector, records => {
    const days = [0,1,2,3,4,5,6]
    return days.map(day => ({
        day,
        recs: (records || []).filter(record => new Date(record.timestamp).getDay() === day)
    }))
}
)

// type X = Record<number, DbTrack[]>

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
