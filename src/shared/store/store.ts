import { routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import thunkMiddleware from "redux-thunk"
import { createRootReducer } from "../reducers/root.reducer"
import { RootSaga } from "../sagas/root.saga"

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

export const configureStore = (initialState = {}) => {
  return createStore(
    createRootReducer(history),
    initialState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        sagaMiddleware
      )
    )
  )
}

export const store = configureStore()

sagaMiddleware.run(RootSaga)
