import Match from '../models/Match';
import Teams from '../models/Teams';

class MatchService {
  public getAll = async () => Match.findAll({
    include: [{ model: Teams, as: 'teamHome' }, { model: Teams, as: 'teamAway' }],
  });
}

export default MatchService;
