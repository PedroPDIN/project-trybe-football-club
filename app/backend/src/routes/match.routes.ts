import { Router } from 'express';
import { MatchController } from '../controllers';

const routeMatch = Router();

const controller = new MatchController();

routeMatch.get('/', controller.matchesAll);

export default routeMatch;
