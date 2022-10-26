import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const TeamsRouter = Router();
const { getAll, getById } = new TeamController();

TeamsRouter.get('/', getAll);
TeamsRouter.get('/:id', getById);

export default TeamsRouter;
