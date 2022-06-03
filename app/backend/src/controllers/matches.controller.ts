import { Request, Response } from 'express';
import { MatchService } from '../services';

export default class MatchController {
  constructor(private service = new MatchService()) {}

  public matchesAll = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.service.matchesAll();
    return res.status(200).json(result);
  };
}
