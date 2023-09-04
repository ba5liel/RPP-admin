import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  getJobResultsById,
  updateJob
} from '../controllers/job.controller';
import { passportJWT } from '../middlewares/passportJWT';
const router = express.Router();

router.get('/', passportJWT, getAllJobs);

router.get('/:jobId/results', passportJWT, getJobResultsById);

router.get('/:jobId', passportJWT, getJobById);

router.post('/', passportJWT, createJob);
router.post('/updatejob', updateJob);

export default router;
