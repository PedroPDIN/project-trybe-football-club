import { Request, Response } from 'express';
import { MatchService } from '../services';

export default class MatchController {
  constructor(private service = new MatchService()) {}

  public matchesAll = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.service.matchesAll();
    return res.status(200).json(result);
  };

  public createMatch = async (req: Request, res: Response): Promise<Response> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    const boolEqual = await this.service.equalTeams(homeTeam, awayTeam);

    if (!boolEqual) {
      return res
        .status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const newMath = await this.service.createMatch(
      {
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress,
      },
    );

    return res.status(201).json(newMath);
  };

  public updateProgress = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const result = await this.service.updateProgress(Number(id));
    if (!result) return res.status(400).json({ message: 'match not found' });
    return res.status(200).json({ message: 'Finished' });
  };
}
