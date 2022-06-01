import { Request, Response } from 'express';
import LoginService from '../services';

export default class LoginController {
  constructor(private service = new LoginService()) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.service.login(req.body);

    if (!result) return res.status(401).json({ message: 'Incorrect email or password' });
    return res.status(200).json(result);
  };
}
