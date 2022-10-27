import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  private readonly matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const fullMatches = await this.matchService.getAll();
    const filteredMatches = await this.matchService.getByCurrentProgress(inProgress);

    if (inProgress) {
      return res.status(200).json(filteredMatches);
    }

    return res.status(200).json(fullMatches);
  };

  create = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const payload = {
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals,
    };
    const newMatch = await this.matchService.create(payload, true);
    return res.status(201).json(newMatch);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const numberId = Number(id);
    await this.matchService.update(numberId, false);
    return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchController;
