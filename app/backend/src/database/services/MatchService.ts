import inProgressFilter from '../../utils/MatchesFilter';
import Match from '../models/Match';
import Teams from '../models/Teams';

class MatchService {
  public getAll = async () => Match.findAll({
    include: [{ model: Teams,
      as: 'teamHome',
      attributes: { exclude: ['id'] } },
    { model: Teams,
      as: 'teamAway',
      attributes: { exclude: ['id'] } }],
  });

  getByCurrentProgress = async (query: any) => {
    const matches = await this.getAll();
    return inProgressFilter(matches, query);
  };
}

export default MatchService;
