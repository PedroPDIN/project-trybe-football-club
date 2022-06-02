import { Request, Response } from 'express';
import { TeamService } from '../services';

export default class TeamController {
  constructor(private service = new TeamService()) {}

  public teamsAll = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.service.teamsAll();

    return res.status(200).json(result);
  };
}
