import { isToday } from "date-fns"
import { createSelector } from "reselect"
import { ReduxState } from "shared/reducers/root.reducer"



export const getRecordsSelector = (state: ReduxState) => state.data.records

// export const getTodaySelector = createSelector(getRecordsSelector, records => {
//     const today = new Date().getDay()
//     return {
//         today,
//         recs: (records || []).filter(record => new Date(record.timestamp).getDay() === today && new Date(record.timestamp).getHours() >= 10 && new Date(record.timestamp).getHours() < 23)
//     }
// }
// )

// export const getPrevRecordsSelector = (state: ReduxState) => state.data.prevRecords


export const getDataSelector = createSelector(getRecordsSelector, records => {
    const days = [0,1,2,3,4,5,6]
    return days.map(day => ({
        day,
        recs: (records || []).filter(record => new Date(record.timestamp).getDay() === day && new Date(record.timestamp).getHours() >= 10 && new Date(record.timestamp).getHours() < 23)
    }))
}
)

// export const getTodaysForecastSelector = createSelector(getPrevRecordsSelector, records => {
//     const today = new Date().getDay()
//     return {
//         today,
//         recs: (records || []).filter(record => {
//             const recordDate = new Date(record.timestamp)
//             const now = new Date()
//             const timeNow = now.getHours() * 3600 + now.getMinutes() * 60 
//             const timeRecord = recordDate.getHours() * 3600 + now.getMinutes() * 60
//             return recordDate.getDay() === today && timeRecord >= timeNow && recordDate.getHours() >= 10 && recordDate.getHours() < 23
//         })
//     }
// }
// )
