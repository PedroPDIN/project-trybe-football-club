import { Router } from 'express';
import isValidLogin from '../middlewares/validations';
import LoginController from '../controllers';

const routeLogin = Router();

const controller = new LoginController();

routeLogin.post('/', isValidLogin, controller.login);

export default routeLogin;
