import { fork, takeEvery, put } from "redux-saga/effects"
import { configureApiSaga } from "frr-redux/lib/frr/rest.saga"
// import { deleteTeam, enterResult, signUp } from "shared/actions/api.actions"
import { store } from "react-notifications-component"
// import { ViewActionType, SetTeam, setTeam } from "../actions/view.actions"

const ApiSaga = configureApiSaga({
  baseUrl: "http://localhost:3001/api",
  debug: false,
})

export function* RootSaga() {
  yield fork(ApiSaga)

  // yield takeEvery(
  //   [deleteTeam.types.success],
  //   function* (action: typeof deleteTeam.action.success) {
  //     yield localStorage.removeItem("team")

  //     yield store.addNotification({
  //       title: "Team deleted",
  //       message: "Success",
  //       type: "success",
  //       insert: "top",
  //       container: "top-right",
  //       animationIn: ["animate__animated", "animate__fadeIn"],
  //       animationOut: ["animate__animated", "animate__fadeOut"],
  //       dismiss: {
  //         duration: 7000,
  //       },
  //     })
  //   }
  // )

  // yield takeEvery(
  //   [deleteTeam.types.failure],
  //   function* (action: typeof deleteTeam.action.failure) {
  //     yield store.addNotification({
  //       title: "Team deleted",
  //       message: "Success",
  //       type: "success",
  //       insert: "top",
  //       container: "top-right",
  //       animationIn: ["animate__animated", "animate__fadeIn"],
  //       animationOut: ["animate__animated", "animate__fadeOut"],
  //       dismiss: {
  //         duration: 7000,
  //       },
  //     })
  //   }
  // )

  // yield takeEvery(
  //   [signUp.types.success],
  //   function* (action: typeof signUp.action.success) {
  //     yield localStorage.setItem("team", action.payload.team._id)
  //   }
  // )

  // yield takeEvery([ViewActionType.SetTeam], function* (action: SetTeam) {
  //   yield localStorage.setItem("team", action.payload)
  // })

  // yield takeEvery([ViewActionType.Initialize], function* () {
  //   const initialTeamId = localStorage.getItem("team")

  //   if (initialTeamId) {
  //     yield put(setTeam(initialTeamId))
  //   }
  // })
}
