import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { ITeam, IMatchBody, INewMath } from '../interfaces';

type Matches = {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean
};

export default class MatchService {
  public matchesAll = async () => {
    const matches = await Match.findAll() as Matches[];
    const teams = matches.map(({ homeTeam, awayTeam }) => this.teamsMatch(homeTeam, awayTeam));
    const teamsPromise = await Promise.all(teams);

    const result = matches
      .map(({ id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress }, i) => (
        {
          id,
          homeTeam,
          homeTeamGoals,
          awayTeam,
          awayTeamGoals,
          inProgress,
          teamHome: { teamName: teamsPromise[i].homeTeam.teamName },
          teamAway: { teamName: teamsPromise[i].awayTeam.teamName },
        }
      ));

    return result;
  };

  private teamsMatch = async (home: number, away: number) => {
    const teamsAll = await Team.findAll() as ITeam[];

    const homeTeam = teamsAll.find(({ id }) => id === home) as ITeam;
    const awayTeam = teamsAll.find(({ id }) => id === away) as ITeam;

    const teams = {
      homeTeam,
      awayTeam,
    };

    return teams;
  };

  public createMatch = async (info: IMatchBody): Promise<INewMath> => {
    const newMatch = await Match.create(info);
    return newMatch;
  };

  public equalTeams = async (homeId: number, awayId: number): Promise<boolean> => {
    const teamsAll = await Team.findAll() as ITeam[];

    const teamHome = teamsAll.find(({ id }) => id === homeId) as ITeam;
    const teamAway = teamsAll.find(({ id }) => id === awayId) as ITeam;

    if (teamHome.teamName === teamAway.teamName) return false;
    return true;
  };

  public updateProgress = async (id: number): Promise<boolean | null > => {
    const findMatch = await Match.findOne({ where: { id } });
    if (!findMatch) return null;

    await Match.update({ inProgress: false }, { where: { id } });
    return true;
  };
}
