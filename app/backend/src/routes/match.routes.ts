import { Router } from 'express';
import { MatchController } from '../controllers';
import { authMatch } from '../middlewares/auth';
import { isValidMatch } from '../middlewares/validations';

const routeMatch = Router();

const controller = new MatchController();

routeMatch.get('/', controller.matchesAll);
routeMatch.post('/', authMatch, isValidMatch, controller.createMatch);
routeMatch.patch('/:id/finish', controller.updateProgress);

export default routeMatch;
