import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const MatchRouter = Router();

const { getAll } = new MatchController();

MatchRouter.get('/', getAll);

export default MatchRouter;
