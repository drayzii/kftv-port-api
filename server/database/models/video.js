
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    description: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    url: DataTypes.STRING,
  }, {});
  Video.associate = function (models) {
    // associations can be defined here
  };
  return Video;
};
