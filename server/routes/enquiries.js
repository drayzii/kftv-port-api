import { Router } from 'express';
import controller from '../controllers/enquiries';
import validation from '../middlewares/enquiries';

const app = Router();

app.post('/new', validation.validateEnquiry, controller.create);

export default app;
