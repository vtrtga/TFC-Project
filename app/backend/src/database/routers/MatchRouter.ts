import { Router } from 'express';
import validateToken from '../../middlewares/validateToken';
import MatchController from '../controllers/MatchController';

const MatchRouter = Router();

const { getAll, create, update } = new MatchController();

MatchRouter.get('/', getAll);

MatchRouter.post('/', validateToken, create);

MatchRouter.put('/:id/finished', update);

export default MatchRouter;
