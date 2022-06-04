import { Router } from 'express';
import { MatchController } from '../controllers';
import { authMatch } from '../middlewares/auth';

const routeMatch = Router();

const controller = new MatchController();

routeMatch.get('/', controller.matchesAll);
routeMatch.post('/', authMatch, controller.createMatch);
routeMatch.patch('/:id/finish', controller.updateProgress);
routeMatch.patch('/:id', controller.updateResult);

export default routeMatch;
