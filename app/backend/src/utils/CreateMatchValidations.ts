import { NextFunction, Request, Response } from 'express';
import TeamService from '../database/services/TeamService';

const blockEqualTeamsRequest = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};

const blockNonexistentTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { getById } = new TeamService();
  const { homeTeam, awayTeam } = req.body;
  const findHomeTeam = await getById(homeTeam);
  const findAwayTeam = await getById(awayTeam);

  if (!findHomeTeam || !findAwayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export { blockEqualTeamsRequest, blockNonexistentTeam };
