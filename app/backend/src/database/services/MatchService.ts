import inProgressFilter from '../../utils/MatchesFilter';
import Match from '../models/Match';
import Teams from '../models/Teams';
import INewMatch from '../../interfaces/NewMatch';

class MatchService {
  public getAll = async () => Match.findAll({
    include: [{ model: Teams,
      as: 'teamHome',
      attributes: { exclude: ['id'] } },
    { model: Teams,
      as: 'teamAway',
      attributes: { exclude: ['id'] } }],
  });

  public create = async ({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals }: INewMatch) =>
    Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    });

  getByCurrentProgress = async (query: any) => {
    const matches = await this.getAll();
    return inProgressFilter(matches, query);
  };
}

export default MatchService;
