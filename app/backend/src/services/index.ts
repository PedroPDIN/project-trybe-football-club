import LoginService from './login.services';
import { generateToken, secret } from './generateToken';
import TeamService from './teams.services';
import MatchService from './Matches.services';

export {
  generateToken,
  LoginService,
  MatchService,
  TeamService,
  secret,
};
