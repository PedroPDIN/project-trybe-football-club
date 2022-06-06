import { Router } from 'express';
import { LeaderBoardController } from '../controllers';

const routeBoard = Router();

const controller = new LeaderBoardController();

routeBoard.get('/home', controller.qualification);

export default routeBoard;
