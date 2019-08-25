import database from '../database/models/index';

const { User } = database;
class UserService {
  static async createUser(user) {
    try {
      return await User.create(user);
    } catch (error) {
      throw error;
    }
  }

  static async userCount(email) {
    try {
      return await User.count({
        where: [{ email }],
      });
    } catch (error) {
      throw error;
    }
  }

  static async getUser(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
