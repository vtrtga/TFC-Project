import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  private readonly teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  getAll = async (req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    return res.status(200).json(teams);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const nId = Number(id);
    const team = await this.teamService.getById(nId);
    return res.status(200).json(team);
  };
}

export default TeamController;
