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

const video = {
  description: 'Description Sample',
};

const updatedvideo = {
  description: 'New Description Sample',
};

const invalidDescription = {
  description: 'X',
};

let token;

before('should create a new user', (done) => {
  chai.request(server)
    .post('/api/v1/auth/signup')
    .send(regData)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      token = res.body.data.token;
      res.body.status.should.equal(201);
      return done();
    });
});
describe('/Add', () => {
  it('should have a valid token', (done) => {
    chai.request(server)
      .post('/api/v1/videos')
      .send(video)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(401);
        return done();
      });
  });
  it('should add a new video', (done) => {
    chai.request(server)
      .post('/api/v1/videos')
      .set('authorization', `Bearer ${token}`)
      .send(video)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(201);
        return done();
      });
  });
  it('should enter valid description', (done) => {
    chai.request(server)
      .post('/api/v1/videos')
      .set('authorization', `Bearer ${token}`)
      .send(invalidDescription)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(400);
        return done();
      });
  });
});
describe('/Update', () => {
  it('should have a valid token', (done) => {
    chai.request(server)
      .patch('/api/v1/videos/1')
      .send(updatedvideo)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(401);
        return done();
      });
  });
  it('should update video', (done) => {
    chai.request(server)
      .patch('/api/v1/videos/1')
      .set('authorization', `Bearer ${token}`)
      .send(updatedvideo)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(200);
        return done();
      });
  });
  it('should enter valid description', (done) => {
    chai.request(server)
      .patch('/api/v1/videos/1')
      .set('authorization', `Bearer ${token}`)
      .send(invalidDescription)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(400);
        return done();
      });
  });
});
describe('/video', () => {
  describe('/View', () => {
    it('should view a video', (done) => {
      chai.request(server)
        .get('/api/v1/videos/1')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(200);
          return done();
        });
    });
    it('should enter valid id', (done) => {
      chai.request(server)
        .get('/api/v1/videos/facebook')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(400);
          return done();
        });
    });
    it('should not return video which does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/videos/200')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.status.should.equal(404);
          return done();
        });
    });

    it('should get all videos', (done) => {
      chai.request(server)
        .get('/api/v1/videos')
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.body.status.should.equal(200);
          done();
        });
    });
  });
});
