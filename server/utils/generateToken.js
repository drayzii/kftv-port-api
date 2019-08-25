import jwt from 'jsonwebtoken';

const generateToken = (id, email) => {
  const token = jwt.sign({
    id, email,
  }, process.env.JWT_KEY);
  return token;
};

export default generateToken;
