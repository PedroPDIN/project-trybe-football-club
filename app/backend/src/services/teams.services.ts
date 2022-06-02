import Team from '../database/models/Team';
import { ITeam } from '../interfaces';

export default class TeamService {
  public teamsAll = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };
}
