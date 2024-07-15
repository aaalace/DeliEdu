import express from "express";
import { body } from "express-validator"
import UserController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();
const userController = new UserController();

router.get('/', userController.getAll);

router.post('/googleAuth',
  userController.googleAuth
);

router.post('/register',
  body('name').isLength({ min: 1, max: 20 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 32 }),
  body('defaultCity').isLength({ min: 1, max: 50 }),
  userController.register
);

router.post('/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 32 }),
  userController.login
);

router.patch('/changeCity',
  authMiddleware,
  body('defaultCity').isLength({ min: 1, max: 50 }),
  userController.changeCity
);

router.get('/logout', userController.logout);

router.get('/refresh', userController.refresh);

router.get('/:userId', userController.getUser);

export default router;