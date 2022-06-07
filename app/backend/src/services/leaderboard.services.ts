import MatchService from './Matches.services';
import TeamService from './teams.services';
import { ITeam } from '../interfaces';

type Matches = {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: { teamName: string },
  teamAway: { teamName: string },
};

export default class LeaderBoardService {
  constructor(
    private serviceMatches = new MatchService(),
    private serviceTeams = new TeamService(),
  ) {}

  public qualification = async () => {
    const matches = await this.serviceMatches.matchesAll() as Matches[];
    const teams = await this.serviceTeams.teamsAll() as ITeam[];

    const matchEndProgress = matches.filter(({ inProgress }) => inProgress === false);
    const teamsAll = teams.map(({ teamName }) => teamName); // todos os nomes dos times
    console.log(teamsAll);

    return matchEndProgress;
  };
}
