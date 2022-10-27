import { Router } from 'express';
import validateToken from '../../middlewares/validateToken';
import MatchController from '../controllers/MatchController';

const MatchRouter = Router();

const { getAll, create } = new MatchController();

MatchRouter.get('/', getAll);

MatchRouter.post('/', validateToken, create);

export default MatchRouter;
