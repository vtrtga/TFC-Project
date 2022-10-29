import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  test = async (req: Request, res: Response) => {
    const result = await this.leaderboardService.teamHomeWinOrTie();
    return res.status(200).json(result[0]);
  };
}

export default LeaderboardController;
