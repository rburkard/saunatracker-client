import * as ApiActions from "shared/actions/api.actions"
// import { SetTeam, ViewActionType } from "shared/actions/view.actions"

// export type ViewState = {
//   teamId: undefined | string
// }

// const initialDataState: ViewState = {
//   teamId: undefined,
// }

// type Action = typeof ApiActions.signUp.action.success | SetTeam

// export const viewReducer = (
//   state: ViewState = initialDataState,
//   action: Action
// ): ViewState => {
//   switch (action.type) {
//     case ViewActionType.SetTeam:
//       return {
//         ...state,
//         teamId: action.payload,
//       }
//     case ApiActions.signUp.types.success:
//       return {
//         ...state,
//         teamId: action.payload.team._id,
//       }
//     default:
//       return state
//   }
// }
