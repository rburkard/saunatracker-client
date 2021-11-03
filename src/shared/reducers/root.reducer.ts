import { combineReducers } from "redux"
import { dataReducer, DataState } from "./data.reducer"
import { connectRouter } from "connected-react-router"
import { viewReducer, ViewState } from "./view.reducer"

export type ReduxState = {
  data: DataState
  router: any
  view: ViewState
}

export const createRootReducer = (history: any) =>
  combineReducers({
    data: dataReducer,
    router: connectRouter(history),
    view: viewReducer,
  })
