import Team from '../models/team'

/**
 * @apiDefine success_team_full
 *
 * @apiSuccess {Integer} id
 * @apiSuccess {String} name
 */
export const fullTeam = (team: Team) => ({
  id: team.id,
  name: team.name
})