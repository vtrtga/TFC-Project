import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRouter = Router();
const { test } = new LeaderboardController();
LeaderboardRouter.get('/home', test);

export default LeaderboardRouter;
