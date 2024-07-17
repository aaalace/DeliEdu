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
  body('name').isLength({ min: 1, max: 20 }).withMessage('name must be 1-20 characters long'),
  body('email').isEmail().withMessage('wrong email format'),
  body('password').isLength({ min: 5, max: 32 }).withMessage('password must be 5-32 characters long'),
  body('defaultCity').isLength({ min: 1, max: 50 }).withMessage('city must be 1-50 characters long'),
  userController.register
);

router.post('/login',
  body('email').isEmail().withMessage('wrong email format'),
  body('password').isLength({ min: 5, max: 32 }).withMessage('password must be 5-32 characters long'),
  userController.login
);

router.patch('/changeCity',
  authMiddleware,
  body('defaultCity').isLength({ min: 1, max: 50 }).withMessage('city must be 1-50 characters long'),
  userController.changeCity
);

router.get('/logout', userController.logout);

router.get('/refresh', userController.refresh);

router.get('/:userId', userController.getUser);

export default router;