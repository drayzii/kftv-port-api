import { Router } from 'express';
import fileupload from 'express-fileupload';
import checkAuth from '../middlewares/checkAuth';
import pictureController from '../controllers/pictureController';
import validation from '../middlewares/videoValidation';

const router = Router();

router.use(fileupload({
  useTempFiles: true,
}));

router.post('/', checkAuth, validation.videoValidation, pictureController.addPicture);
router.get('/', pictureController.getAllPictures);
router.get('/:id', validation.videoIdValidate, pictureController.viewPicture);
router.patch('/:id', checkAuth, validation.videoValidation, validation.videoIdValidate, pictureController.updatePicture);
router.delete('/:id', checkAuth, validation.videoIdValidate, pictureController.deletePicture);

export default router;
