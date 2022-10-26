import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const TeamsRouter = Router();
const teamController = new TeamController();

TeamsRouter.get('/', teamController.getAll);
TeamsRouter.get('/:id', teamController.getById);

export default TeamsRouter;
