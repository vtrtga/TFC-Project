import sequelize from '../models';
import homeTeamQuery from '../Queries';
// import Teams from '../models/Teams';
// import

class LeaderboardService {
  teamHomeWinOrTie = async () => sequelize.query(homeTeamQuery);
}

export default LeaderboardService;
