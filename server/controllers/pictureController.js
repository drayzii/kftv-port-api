import PictureService from '../services/pictureService';
import uploader from '../utils/cloudinaryPicture';

class PictureController {
  static async addPicture(req, res) {
    const newPicture = req.body;
    if (req.files) {
      const file = req.files.picture;
      const picture = await uploader(file.tempFilePath);
      newPicture.url = picture.url;
    }
    try {
      const createdPicture = await PictureService.addPicture(newPicture);
      return res.status(201).json({
        status: 201,
        message: 'Picture successfully added!',
        data: createdPicture,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error,
      });
    }
  }

  static async updatePicture(req, res) {
    const picture = req.body;
    try {
      const [rowsNumber, [{ dataValues }]] = await PictureService.updatePicture(req.params.id, picture);
      return res.status(201).json({
        status: 200,
        message: 'Description successfully updated!',
        data: dataValues,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error,
      });
    }
  }

  static async viewPicture(req, res) {
    const PictureId = req.params.id;
    const viewPicture = await PictureService.findPicture(PictureId);
    if (viewPicture) {
      return res.status(200).json({
        status: res.statusCode,
        message: 'Picture retrieved successfully',
        data: viewPicture,
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      message: 'Picture does not exist',
    });
  }

  static async deletePicture(req, res) {
    const PictureId = req.params.id;
    const viewPicture = await PictureService.deletePicture(PictureId);
    if (viewPicture) {
      return res.status(200).json({
        status: res.statusCode,
        message: 'Picture successfully deleted',
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      message: 'Picture does not exist',
    });
  }

  static async getAllPictures(req, res) {
    const allPictures = await PictureService.getAllPictures();
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved all Pictures',
      data: allPictures,
    });
  }
}

export default PictureController;
