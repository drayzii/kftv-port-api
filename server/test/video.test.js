/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';

chai.should();
chai.use(chaiHttp);

const regData = {
  email: 'jonashyaka2@gmail.com',
  firstName: 'Jonathan',
  lastName: 'Shyaka',
  password: 'Pass1234',
};

const updatedvideo = {
  description: 'New Description Sample',
  category: 'category2',
};

const invalidDescription = {
  description: 'X',
};

const invalidCategory = {
  description: 'New Description Sample',
  category: 'X',
};

let token;

before('should create a new user', () => {
  chai.request(server)
    .post('/api/v1/auth/signup')
    .send(regData)
    .then((err, res) => {
      token = res.body.data.token;
      return res.body.status.should.equal(201);
    });
});
describe('/Add', () => {
  it('should have a valid token', () => {
    chai.request(server)
      .post('/api/v1/videos')
      .attach('video', 'server/test/videoplayback.mp4', 'videoplayback.mp4')
      .field('description', 'New Description Sample')
      .field('categeory', 'category')
      .then((err, res) => res.body.status.should.equal(401));
  });
  it('should add a new video', () => {
    chai.request(server)
      .post('/api/v1/videos')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .attach('video', 'server/test/videoplayback.mp4', 'videoplayback.mp4')
      .field('description', 'New Description Sample')
      .field('category', 'category')
      .then((err, res) => res.body.status.should.equal(201));
  });
  it('should enter valid description', () => {
    chai.request(server)
      .post('/api/v1/videos')
      .set('authorization', `Bearer ${token}`)
      .send(invalidDescription)
      .then((err, res) => res.body.status.should.equal(400));
  });
  it('should enter valid category', () => {
    chai.request(server)
      .post('/api/v1/videos')
      .set('authorization', `Bearer ${token}`)
      .send(invalidCategory)
      .then((err, res) => res.body.status.should.equal(400));
  });
});
describe('/Update', () => {
  it('should have a valid token', () => {
    chai.request(server)
      .patch('/api/v1/videos/1')
      .send(updatedvideo)
      .then((err, res) => res.body.status.should.equal(401));
  });
  it('should update video', () => {
    chai.request(server)
      .patch('/api/v1/videos/1')
      .set('authorization', `Bearer ${token}`)
      .send(updatedvideo)
      .then((err, res) => res.body.status.should.equal(200));
  });
  it('should enter valid description', () => {
    chai.request(server)
      .patch('/api/v1/videos/1')
      .set('authorization', `Bearer ${token}`)
      .send(invalidDescription)
      .then((err, res) => res.body.status.should.equal(400));
  });
});
describe('/video', () => {
  describe('/View', () => {
    it('should view a video', () => {
      chai.request(server)
        .get('/api/v1/videos/1')
        .then((err, res) => res.body.status.should.equal(200));
    });
    it('should enter valid id', () => {
      chai.request(server)
        .get('/api/v1/videos/facebook')
        .then((err, res) => res.body.status.should.equal(400));
    });
    it('should not return video which does not exist', () => {
      chai.request(server)
        .get('/api/v1/videos/200')
        .then((err, res) => res.body.status.should.equal(404));
    });

    it('should get all videos', () => {
      chai.request(server)
        .get('/api/v1/videos')
        .then((err, res) => res.body.status.should.equal(200));
    });

    it('should get all videos by category', () => {
      chai.request(server)
        .get('/api/v1/videos?category=category')
        .then((err, res) => res.body.status.should.equal(200));
    });
  });
});
