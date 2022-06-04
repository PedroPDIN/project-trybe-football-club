import Team from '../database/models/Team';
import { ITeam } from '../interfaces';

export default class TeamService {
  public teamsAll = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll() as ITeam[];
    return teams;
  };

  public findTeam = async (id: number): Promise<ITeam | null> => {
    const team = await Team.findOne({ where: { id } }) as ITeam;
    if (!team) return null;
    return team;
  };
}
