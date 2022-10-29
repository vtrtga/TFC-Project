import { Router } from 'express';
import { blockNonexistentTeam, blockEqualTeamsRequest } from '../../utils/CreateMatchValidations';
import validateToken from '../../middlewares/validateToken';
import MatchController from '../controllers/MatchController';

const MatchRouter = Router();

const { getAll, create, update, updateMatchResult } = new MatchController();

MatchRouter.get('/', getAll);

MatchRouter.post('/', validateToken, blockEqualTeamsRequest, blockNonexistentTeam, create);

MatchRouter.patch('/:id/finish', update);

MatchRouter.patch('/:id', updateMatchResult);

export default MatchRouter;
