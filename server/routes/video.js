import { Router } from 'express';
import fileupload from 'express-fileupload';
import checkAuth from '../middlewares/checkAuth';
import videoController from '../controllers/video';
import validation from '../middlewares/video';

const router = Router();

router.use(fileupload({
  useTempFiles: true,
}));

router.post('/', checkAuth, validation.videoValidation, videoController.addVideo);
router.get('/', videoController.getAllVideos);
router.get('/:id', validation.videoIdValidate, videoController.viewVideo);
router.patch('/:id', checkAuth, validation.videoValidation, videoController.updateVideo);
router.delete('/:id', checkAuth, validation.videoIdValidate, videoController.deleteVideo);

export default router;
