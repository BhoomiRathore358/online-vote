import express from 'express';
import { getCandidates, addCandidate, voteCandidate } from '../controllers/candidateController.js';

const router = express.Router();

router.route('/').get(getCandidates).post(addCandidate);
router.route('/vote/:id').put(voteCandidate);

export default router;
