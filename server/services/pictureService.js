/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Picture } = database;
class PictureService {
  static async addPicture(newPicture) {
    try {
      return await Picture.create(newPicture);
    } catch (error) {
      throw error;
    }
  }

  static async updatePicture(id, picture) {
    try {
      return await Picture.update(picture, {
        returning: true,
        where: [{ id }],
      });
    } catch (error) {
      throw error;
    }
  }

  static async findPicture(id) {
    try {
      return await Picture.findOne({
        where: [{ id }],
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllPictures() {
    try {
      return await Picture.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async deletePicture(id) {
    try {
      return await Picture.destroy({
        where: [{ id }],
      });
    } catch (error) {
      throw error;
    }
  }
}

export default PictureService;
