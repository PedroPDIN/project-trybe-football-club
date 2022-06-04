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

type Results = {
  homeTeamGoals: number,
  awayTeamGoals: number,
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

  public createMatch = async (info: IMatchBody): Promise<INewMath> => {
    const newMatch = await Match.create(info);
    return newMatch;
  };

  public validTeams = async (homeId: number, awayId: number): Promise<number> => {
    const teams = await this.teamsMatch(homeId, awayId);
    if (!teams.homeTeam || !teams.awayTeam) return 1;
    if (teams.homeTeam.teamName === teams.awayTeam.teamName) return 2;
    return 0;
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

  public updateProgress = async (id: number): Promise<boolean> => {
    const findMatch = await Match.findOne({ where: { id } });
    if (!findMatch) return false;

    await Match.update({ inProgress: false }, { where: { id } });
    return true;
  };

  public updateResult = async (id: number, results: Results): Promise<boolean> => {
    const { homeTeamGoals, awayTeamGoals } = results;
    const findMatch = await Match.findOne({ where: { id } });
    if (!findMatch) return false;

    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return true;
  };
}
