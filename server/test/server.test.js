/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';

chai.should();
chai.use(chaiHttp);

describe('/Homepage', () => {
  it('should return a welcome message', (done) => {
    chai
      .request(server)
      .get('/')
      .send()
      .then((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(200);
        return done();
      })
      .catch(done);
  });
  it('should return page unknown', (done) => {
    chai
      .request(server)
      .get('/unknown')
      .send()
      .then((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.status.should.equal(404);
        return done();
      })
      .catch(done);
  });
});
