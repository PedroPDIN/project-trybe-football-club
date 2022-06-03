import { Request, Response } from 'express';
import { TeamService } from '../services';

export default class TeamController {
  constructor(private service = new TeamService()) {}

  public teamsAll = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.service.teamsAll();
    return res.status(200).json(result);
  };

  public findTeam = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const result = await this.service.findTeam(Number(id));
    if (!result) return res.status(404).json({ message: 'team not found' });
    return res.status(200).json(result);
  };
}
