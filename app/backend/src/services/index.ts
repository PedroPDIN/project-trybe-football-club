import LoginService from './login.services';
import { generateToken, secret } from './generateToken';
import TeamService from './teams.services';
import MatchService from './Matches.services';
import LeaderBoardService from './leaderboard.services';

export {
  generateToken,
  LeaderBoardService,
  LoginService,
  MatchService,
  TeamService,
  secret,
};
