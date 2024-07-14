import express from "express";
import {body} from "express-validator"
import InviteController from "../controllers/inviteController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();
const inviteController = new InviteController();

router.get('/', inviteController.getInvites);

router.post('/',
  authMiddleware,
  body('city').isLength({min: 1, max: 100}),
  body('description').isLength({min: 1, max: 1000}),
  body('contacts').isLength({min: 1, max: 500}),
  inviteController.addInvite
);

router.delete('/:inviteId',
  authMiddleware,
  inviteController.deleteInvite
);

export default router;