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
}

export default MatchService;
