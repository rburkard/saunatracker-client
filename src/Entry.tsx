import React from "react"
import { ConnectedRouter } from "connected-react-router"

import { Provider } from "react-redux"

import { history, store } from "shared/store/store"
import { App } from "App"

export const Entry = () => {
  return (
    <Provider store={store as any}>
      <ConnectedRouter history={history as unknown as any}>
        <App />
      </ConnectedRouter>
    </Provider>
  )
}
