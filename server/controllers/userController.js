import Password from '../utils/generatePassword';
import userService from '../services/userService';
import generateToken from '../utils/generateToken';

class Users {
  static async createUser(req, res) {
    const details = await userService.userCount(req.body.email);
    if (details) {
      return res.status(409).send({
        status: res.statusCode,
        message: 'user already exists',
      });
    }
    const userCount = userService.userCount(req.body.email);
    const newPassword = await Password.generatePassword(req.body, userCount);
    req.body.password = newPassword;
    const data = await userService.createUser(req.body);
    const token = await generateToken(data.id, data.email);
    return res.status(201).send({
      status: 201,
      message: 'Account has been created successfully',
      data: {
        token,
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  }

  static async signin(req, res) {
    const { email, password } = req.body;
    const userExist = await userService.getUser(email);
    if (!userExist)
      return res.status(404).send({ status: 404, message: 'user not found' });
    const user = { ...userExist.dataValues };
    const hashedPassword = user.password;
    const match = await Password.checkPasswordMatch(hashedPassword, password);
    if (!match)
      return res.status(400).send({ status: 400, message: 'Password is incorrect', });
    const { id } = user;
    const token = generateToken(id, email);
    delete user.password;
    const data = { token, ...user };
    return res.status(200).send({
      status: 200,
      data: {
        token,
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  }
}

export default Users;
