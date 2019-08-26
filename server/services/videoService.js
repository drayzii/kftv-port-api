/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Video } = database;
class VideoService {
  static async addVideo(newVideo) {
    try {
      return await Video.create(newVideo);
    } catch (error) {
      throw error;
    }
  }

  static async updateVideo(id, video) {
    try {
      return await Video.update(video, {
        returning: true,
        where: [{ id }],
      });
    } catch (error) {
      throw error;
    }
  }

  static async findVideo(id) {
    try {
      return await Video.findOne({
        where: [{ id }],
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllVideos() {
    try {
      return await Video.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async deleteVideo(id) {
    try {
      return await Video.destroy({
        where: [{ id }],
      });
    } catch (error) {
      throw error;
    }
  }
}

export default VideoService;
