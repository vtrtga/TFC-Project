import Teams from '../models/Teams';

class TeamService {
  getAll = async () => Teams.findAll();
  getById = async (id: number) => Teams.findByPk(id);
}

export default TeamService;
