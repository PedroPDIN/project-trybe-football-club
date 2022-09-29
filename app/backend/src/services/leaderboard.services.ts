import MatchService from './Matches.services';
import { average, compare } from '../helpers';
import { ILeaderBoard } from '../interfaces';

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
  ) {}

  public qualification = async () => {
    const matches = await this.serviceMatches.matchesAll() as Matches[];
    const matchesEndProgress = matches.filter(({ inProgress }) => inProgress === false); // filtrando partidas encerradas
    const teamsAllHome = matchesEndProgress.map(({ teamHome }) => teamHome.teamName); // todos os times da casa com as partidas encerradas.
    const teamsHome = teamsAllHome.filter((v, i) => teamsAllHome.indexOf(v) === i); // eliminando nome de times repetitivos;
    const result = this.structure(teamsHome, matchesEndProgress);
    return result;
  };

  private totalPoints = (matches: Matches[]) => {
    let totalPoints = 0;
    matches.forEach((v) => {
      if (v.homeTeamGoals > v.awayTeamGoals) {
        totalPoints += 3;
      }

      if (v.homeTeamGoals === v.awayTeamGoals) {
        totalPoints += 1;
      }
    });
    return totalPoints;
  };

  private totalGames = (matches: Matches[]) => {
    const totalGames = matches.length;
    return totalGames;
  };

  private totalVictories = (matches: Matches[]) => {
    let totalVictories = 0;
    matches.forEach((v) => {
      if (v.homeTeamGoals > v.awayTeamGoals) {
        totalVictories += 1;
      }
    });
    return totalVictories;
  };

  private totalDraws = (matches: Matches[]) => {
    let totalDraws = 0;
    matches.forEach((v) => {
      if (v.homeTeamGoals === v.awayTeamGoals) {
        totalDraws += 1;
      }
    });
    return totalDraws;
  };

  private totalLosses = (matches: Matches[]) => {
    let totalLosses = 0;
    matches.forEach((v) => {
      if (v.homeTeamGoals < v.awayTeamGoals) {
        totalLosses += 1;
      }
    });
    return totalLosses;
  };

  private goalsFavor = (matches: Matches[]) => {
    const goalsFavor = matches.reduce((acc, v) => (
      v.homeTeamGoals + acc
    ), 0);
    return goalsFavor;
  };

  private goalsOwn = (matches: Matches[]) => {
    const goalsOwn = matches.reduce((acc, v) => (
      v.awayTeamGoals + acc
    ), 0);
    return goalsOwn;
  };

  private goalsBalance = (matches: Matches[]) => {
    const goalsBalance = this.goalsFavor(matches) - this.goalsOwn(matches);
    return goalsBalance;
  };

  private efficiency = (matches: Matches[]) => {
    const points = this.totalPoints(matches);
    const games = this.totalGames(matches);
    const result = average(points, games);
    return Number(result);
  };

  private order = (list: ILeaderBoard[]) => compare(list);

  private structure = (teams: string[], matches: Matches[]) => {
    const list: ILeaderBoard[] = [];
    teams.forEach((name) => {
      const matchFilter = matches.filter((match) => (match.teamHome.teamName === name));

      list.push({
        name,
        totalPoints: this.totalPoints(matchFilter),
        totalGames: this.totalGames(matchFilter),
        totalVictories: this.totalVictories(matchFilter),
        totalDraws: this.totalDraws(matchFilter),
        totalLosses: this.totalLosses(matchFilter),
        goalsFavor: this.goalsFavor(matchFilter),
        goalsOwn: this.goalsOwn(matchFilter),
        goalsBalance: this.goalsBalance(matchFilter),
        efficiency: this.efficiency(matchFilter),
      });
    });

    const result = this.order(list);
    return result;
  };
}
