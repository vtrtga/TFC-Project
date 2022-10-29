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

  public create = async (
    {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals }: INewMatch,
    inProgress: boolean,
  ) =>
    Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });

  getByCurrentProgress = async (query: any) => {
    const matches = await this.getAll();
    return inProgressFilter(matches, query);
  };

  update = async (id: number, value: boolean) => Match.update(
    { inProgress: value },
    { where: { id } },
  );

  updateMatchResult = (id: number, homeTeamGoals: number, awayTeamGoals: number) => Match.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id } },
  );
}

export default MatchService;
