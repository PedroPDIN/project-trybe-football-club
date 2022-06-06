import MatchService from './Matches.services';

export default class LeaderBoardService {
  constructor(private serviceMatches = new MatchService()) {}

  public qualification = async () => {
    const teams = await this.serviceMatches.matchesAll();

    return teams;
  };
}
