import { Router } from 'express';
import { TeamController } from '../controllers';

const routeTeam = Router();

const controller = new TeamController();

routeTeam.get('/', controller.teamsAll);

export default routeTeam;
