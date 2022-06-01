import { Router } from 'express';
import LoginController from '../controllers';

const routeLogin = Router();

const controller = new LoginController();

routeLogin.post('/', controller.login);

export default routeLogin;
