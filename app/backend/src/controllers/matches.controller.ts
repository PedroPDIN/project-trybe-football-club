import { Request, Response } from 'express';
import { MatchService } from '../services';
import { list } from '../helpers';

export default class MatchController {
  constructor(private service = new MatchService()) {}

  public matchesAll = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.service.matchesAll();
    return res.status(200).json(result);
  };

  public createMatch = async (req: Request, res: Response): Promise<Response> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    const errorId = await this.service.validTeams(homeTeam, awayTeam);

    if (errorId === 1) {
      return res
        .status(list[0].status as number)
        .json({ message: list[0].message });
    }

    if (errorId === 2) {
      return res
        .status(list[1].status as number)
        .json({ message: list[1].message });
    }

    const newMath = await this.service.createMatch(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
    );

    return res.status(201).json(newMath);
  };

  public updateProgress = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const result = await this.service.updateProgress(Number(id));
    if (!result) return res.status(400).json({ message: 'match not found' });
    return res.status(200).json({ message: 'Finished' });
  };

  public updateResult = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const result = await this.service.updateResult(Number(id), req.body);
    if (!result) return res.status(400).json({ message: 'match not found' });
    return res.status(200).json({ message: 'result changed successfully' });
  };
}
