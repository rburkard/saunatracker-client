const location = window.location.host

const isProduction = !location.includes("localhost")

export const SERVER_URL = isProduction
  ? "https://r2r.forone.red/api"
  : "https://r2r.forone.red/api"
