
module.exports = (sequelize, DataTypes) => {
  const enquiries = sequelize.define('enquiries', {
    names: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.STRING,
  }, {});
  enquiries.associate = function (models) {
    // associations can be defined here
  };
  return enquiries;
};
