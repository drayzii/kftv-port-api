import express from 'express';
import Users from '../controllers/user';
import userValidation from '../middlewares/user';

const router = express.Router();

router.post('/signup', userValidation.validateUser, Users.createUser);
router.post('/signin', userValidation.validateSignin, Users.signin);
export default router;
