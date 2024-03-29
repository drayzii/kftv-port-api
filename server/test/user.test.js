/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;

const signupUrl = '/api/v1/auth/signup';
const signinUrl = '/api/v1/auth/signin';

chai.use(chaiHttp);

const regData = {
  email: 'jonathanaurugai12@gmail.com',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  password: 'Root1234',
};
const regDataWrongFirstName = {
  email: 'jonathanaurugai12@gmail.com',
  firstName: '',
  lastName: 'Aurugai',
  password: 'Root1234',
};
const regDataWrongLastName = {
  email: 'jonathanaurugai12@gmail.com',
  firstName: 'Jonathan',
  lastName: '',
  password: 'Root1234',
};
const regDataWrongEmail = {
  email: 'jonathanaurugai12',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  password: 'Root1234',
};
const regDataWrongPassword = {
  email: 'jonathanaurugai12@gmail.com',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  password: 'Root',
};

const signin = {
  email: 'jonathanaurugai12@gmail.com',
  password: 'Root1234',
};
const noEmail = {
  password: 'Root1234',
};
const noPassword = {
  email: 'jonathanaurugai12@gmail.com',
};
const wrongEmail = {
  email: 'thanaurugai12@gmail.com',
  password: 'Root1234',
};
const wrongPassword = {
  email: 'jonathanaurugai12@gmail.com',
  password: 'RooT1234',
};
const invalidEmail = {
  email: 'jonathanaurugai12mail.com',
  password: 'Root1234',
};
const invalidPassword = {
  email: 'jonathanaurugai12@gmail.com',
  password: 'abcd',
};

describe('User', () => {
  describe('creates an account', () => {
    it('with invaild properties', () => {
      chai
        .request(server)
        .post(signupUrl).send(regData).then((_err, res) => expect(res.status).to.eq(201));
    });
    it('with invaild first name', () => {
      chai
        .request(server)
        .post(signupUrl)
        .send(regDataWrongFirstName).then((_err, res) => expect(res.status).to.eq(400));
    });
    it('with invaild last name', () => {
      chai
        .request(server)
        .post(signupUrl)
        .send(regDataWrongLastName).then((_err, res) => expect(res.status).to.eq(400));
    });
    it('with invaild email', () => {
      chai
        .request(server)
        .post(signupUrl)
        .send(regDataWrongEmail).then((_err, res) => expect(res.status).to.eq(400));
    });
    it('with invaild password', () => {
      chai
        .request(server)
        .post(signupUrl)
        .send(regDataWrongPassword).then((_err, res) => expect(res.status).to.eq(400));
    });
  });

  describe('sign in', () => {
    it('should signin successfully', () => {
      chai
        .request(server)
        .post(signinUrl)
        .send(signin).then((_err, res) => expect(res.status).to.eq(200));
    });

    it('should not signin without email', () => {
      chai
        .request(server)
        .post(signinUrl)
        .send(noEmail).then((_err, res) => expect(res.status).to.eq(400));
    });

    it('should not signin without password', () => {
      chai
        .request(server)
        .post(signinUrl)
        .send(noPassword).then((_err, res) => expect(res.status).to.eq(400));
    });

    it('should not signin an unregistered user', () => {
      chai
        .request(server)
        .post(signinUrl)
        .send(wrongEmail).then((_err, res) => expect(res.status).to.eq(404));
    });

    it('should not signin with a wrong password', () => {
      chai
        .request(server)
        .post(signinUrl)
        .send(wrongPassword).then((_err, res) => expect(res.status).to.eq(400));
    });

    it('should not signin with invalid email', () => {
      chai
        .request(server)
        .post(signinUrl)
        .send(invalidEmail).then((_err, res) => expect(res.status).to.eq(400));
    });

    it('should not signin with invalid password', () => {
      chai
        .request(server)
        .post(signinUrl)
        .send(invalidPassword).then((_err, res) => expect(res.status).to.eq(400));
    });
  });
});
