import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  private readonly matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  getAll = async (_req: Request, res: Response) => {
    const matches = this.matchService.getAll();

    return res.status(200).json(matches);
  };
}

export default MatchController;
