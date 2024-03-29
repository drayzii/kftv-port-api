import dotenv from 'dotenv';

dotenv.config();
module.exports = {
  development: {
    use_env_variable: 'DEV_DATABASE_URL',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'mysql',
  },
  test: {
    use_env_variable: 'TEST_DATABASE_URL',
    dialect: 'mysql',
  },
};
