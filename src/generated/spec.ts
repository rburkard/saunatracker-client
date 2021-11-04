import { DbUser } from 'frr-global/lib/global'
import {
  GetRequest,
  RestMethod,
  PostRequest,
} from 'frr-redux/lib/frr/api.types'
import { DbTrack } from './database.types'

export enum Endpoints {
  StoreCount = 'store_count',

  // GetTeams = '/get_teams',
  // GetResults = '/get_results',
  // GetPartyThemes = '/get_party_themes',
  // GetPartyTemplates = '/get_party_templates',
  // GetGamesByTheme = '/get_games_by_theme',
  // GetUser = '/get_user',
  // GetParty = '/get_party',
  // GetPartiesByUser = '/get_parties',

  GetRecords = '/get_records',
  GetPrevRecords = '/get_prev_records',

  // CreateGame = '/create_game',
  // SignUp = '/sign_up',
  // EnterResult = '/enter_result',
  // DeleteTeam = '/delete_team',
  // CreateParty = '/create_party',
  // CreateUser = '/create_user',
  // CreateTeam = '/create_team',

  // UpdateParty = '/update_party',
}

export type API = {
  // GET
  [Endpoints.GetRecords]: GetRequest<{
    query: { startDate: number; endDate: number }
    response: Array<DbTrack>
  }>

  [Endpoints.GetPrevRecords]: GetRequest<{
    query: { startDate: number; endDate: number }
    response: Array<DbTrack>
  }>

  // POST
  [Endpoints.StoreCount]: PostRequest<{
    json: DbTrack
    response: {}
  }>

  // GET
  // [Endpoints.GetGames]: GetRequest<{
  //   response: Array<DbGame>
  // }>
  // [Endpoints.GetTeams]: GetRequest<{
  //   query: { partyId: string }
  //   response: Array<DbTeam>
  // }>
  // [Endpoints.GetResults]: GetRequest<{
  //   response: Record<string, Record<string, number>>
  // }>
  // [Endpoints.GetPartyThemes]: GetRequest<{
  //   response: Array<DbPartyTheme>
  // }>
  // [Endpoints.GetPartyTemplates]: GetRequest<{
  //   query: { partyThemeId: string }
  //   response: Array<DbPartyTemplate>
  // }>
  // [Endpoints.GetGamesByTheme]: GetRequest<{
  //   query: { partyThemeId: string }
  //   response: Array<DbGame>
  // }>
  // [Endpoints.GetUser]: GetRequest<{
  //   query: { userId: string }
  //   response: Array<DbCustomUser>
  // }>
  // [Endpoints.GetParty]: GetRequest<{
  //   query: { partyId: string }
  //   response: Array<DbParty>
  // }>

  // [Endpoints.GetPartiesByUser]: GetRequest<{
  //   query: { userId: string }
  //   response: Array<DbParty>
  // }>

  // // POST
  // [Endpoints.DeleteTeam]: PostRequest<{
  //   json: { teamId: string }
  //   response: { teamId: string }
  // }>
  // [Endpoints.EnterResult]: PostRequest<{
  //   json: Omit<DbResult, '_id' | 'timestamp'>
  //   response: {}
  // }>
  // [Endpoints.SignUp]: PostRequest<{
  //   json: Omit<DbTeam, '_id' | 'timestamp'>
  //   response: { team: DbTeam }
  // }>
  // [Endpoints.CreateGame]: PostRequest<{
  //   json: Omit<DbGame, '_id' | 'timestamp'>
  //   response: {}
  // }>
  // [Endpoints.CreateParty]: PostRequest<{
  //   json: Omit<DbParty, '_id' | 'timestamp'>
  //   response: { party: DbParty }
  // }>
  // [Endpoints.CreateUser]: PostRequest<{
  //   json: Omit<DbCustomUser, '_id' | 'timestamp'> & { partyId: string }
  //   response: { user: DbCustomUser }
  // }>
  // [Endpoints.CreateTeam]: PostRequest<{
  //   json: Omit<DbTeam, '_id' | 'timestamp'>
  //   response: {}
  // }>

  // [Endpoints.UpdateParty]: PostRequest<{
  //   json: Omit<
  //     DbParty,
  //     'userId' | 'partyThemeId' | 'games' | 'teams' | 'timestamp'
  //   >
  //   response: {}
  // }>
}

export const mapEndpointToMethod: {
  [k in Endpoints]: API[k]['method']
} = {
  [Endpoints.GetRecords]: RestMethod.GET,
  [Endpoints.GetPrevRecords]: RestMethod.GET,

  [Endpoints.StoreCount]: RestMethod.POST,
  // [Endpoints.GetGames]: RestMethod.GET,
  // [Endpoints.GetTeams]: RestMethod.GET,
  // [Endpoints.GetResults]: RestMethod.GET,
  // [Endpoints.GetPartyThemes]: RestMethod.GET,
  // [Endpoints.GetPartyTemplates]: RestMethod.GET,
  // [Endpoints.GetGamesByTheme]: RestMethod.GET,
  // [Endpoints.GetUser]: RestMethod.GET,
  // [Endpoints.GetParty]: RestMethod.GET,
  // [Endpoints.GetPartiesByUser]: RestMethod.GET,

  // [Endpoints.DeleteTeam]: RestMethod.POST,
  // [Endpoints.EnterResult]: RestMethod.POST,
  // [Endpoints.SignUp]: RestMethod.POST,
  // [Endpoints.CreateGame]: RestMethod.POST,
  // [Endpoints.CreateParty]: RestMethod.POST,
  // [Endpoints.CreateUser]: RestMethod.POST,
  // [Endpoints.CreateTeam]: RestMethod.POST,

  // [Endpoints.UpdateParty]: RestMethod.POST,
}
