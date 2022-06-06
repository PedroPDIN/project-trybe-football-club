import { Request, Response } from 'express';
import { LeaderBoardService } from '../services';

export default class LeaderBoardController {
  constructor(private service = new LeaderBoardService()) {}

  public qualification = async (_req: Request, res: Response) => {
    const teams = await this.service.qualification();
    return res.status(200).json(teams);
  };
}
