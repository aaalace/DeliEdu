import express from 'express';
import UserRouter from "./userRouter";

const router = express.Router();

router.use('/users', UserRouter);

export default router;