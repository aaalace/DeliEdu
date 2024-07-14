import express from 'express';
import UserRouter from "./userRouter";
import InviteRouter from "./inviteRouter";

const router = express.Router();

router.use('/users', UserRouter);
router.use('/invites', InviteRouter)

export default router;