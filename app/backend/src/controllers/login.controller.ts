import { Request, Response } from 'express';
import LoginService from '../services';

export default class Login {
  constructor(private service = new LoginService()) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const user = req.body;
    const result = await this.service.login(user);

    try {
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
  };
}
