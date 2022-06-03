import { Router } from 'express';
import { TeamController } from '../controllers';

const routeTeam = Router();

const controller = new TeamController();

routeTeam.get('/', controller.teamsAll);
routeTeam.get('/:id', controller.findTeam);

export default routeTeam;
