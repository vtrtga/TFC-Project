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
    const newMatch = this.matchService.create(req.body);

    return res.status(201).json(newMatch);
  };
}

export default MatchController;
