import { Router } from 'express';
import { isValidLogin } from '../middlewares/validations';
import { authLogin } from '../middlewares/auth';
import { LoginController } from '../controllers';

const routeLogin = Router();

const controller = new LoginController();

routeLogin.get('/validate', authLogin, controller.loginValidate);
routeLogin.post('/', isValidLogin, controller.login);

export default routeLogin;
