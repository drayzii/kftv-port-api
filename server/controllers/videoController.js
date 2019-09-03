import VideoService from '../services/videoService';
import uploader from '../utils/cloudinaryVideo';

class VideoController {
  static async addVideo(req, res) {
    const newVideo = req.body;
    if (req.files) {
      const file = req.files.video;
      const video = await uploader(file.tempFilePath);
      newVideo.url = video.url;
      newVideo.thumbnail = video.url.replace('mp4', 'jpg');
    }
    try {
      const createdVideo = await VideoService.addVideo(newVideo);
      return res.status(201).json({
        status: 201,
        message: 'Video successfully added!',
        data: createdVideo,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error,
      });
    }
  }

  static async updateVideo(req, res) {
    const video = req.body;
    try {
      const [rowsNumber, [{ dataValues }]] = await VideoService.updateVideo(req.params.id, video);
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

  static async viewVideo(req, res) {
    const VideoId = req.params.id;
    const viewVideo = await VideoService.findVideo(VideoId);
    if (viewVideo) {
      return res.status(200).json({
        status: res.statusCode,
        message: 'Video retrieved successfully',
        data: viewVideo,
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      message: 'Video does not exist',
    });
  }

  static async deleteVideo(req, res) {
    const VideoId = req.params.id;
    const viewVideo = await VideoService.deleteVideo(VideoId);
    if (viewVideo) {
      return res.status(200).json({
        status: res.statusCode,
        message: 'Video successfully deleted',
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      message: 'Video does not exist',
    });
  }

  static async getAllVideos(req, res) {
    const allVideos = await VideoService.getAllVideos();
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved all Videos',
      data: allVideos,
    });
  }
}

export default VideoController;
