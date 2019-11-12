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
  category: 'category2'
};

const invalidDescription = {
  description: 'X',
};

const invalidCategory = {
  description: 'New Description Sample',
  category: 'X'
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
      .attach('video', 'server/test/videoplayback.mp4', 'videoplayback.mp4')
      .field('description', 'New Description Sample')
      .field('categeory', 'category')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(401);
        return done();
      });
  });
  it('should add a new video', (done) => {
    const data = {
      description: 'Sample videos',
      category: 'Trailers',
      thumbnail: 'www.google.com',
      url: 'www.google.com/images',
    }

    chai.request(server)
      .post('/api/v1/videos')
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(data)
      // .attach('video', 'server/test/videoplayback.mp4', 'videoplayback.mp4')
      // .field('description', 'New Description Sample')
      // .field('category', 'category')
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
  it('should enter valid category', (done) => {
    chai.request(server)
      .post('/api/v1/videos')
      .set('authorization', `Bearer ${token}`)
      .send(invalidCategory)
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

    it('should get all videos by category', (done) => {
      chai.request(server)
        .get('/api/v1/videos?category=category')
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