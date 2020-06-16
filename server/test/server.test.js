/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';

chai.should();
chai.use(chaiHttp);

describe('/Homepage', () => {
  it('should return a welcome message', () => {
    chai
      .request(server)
      .get('/')
      .send()
      .then((err, res) => res.body.status.should.equal(200));
  });
  it('should return page unknown', () => {
    chai
      .request(server)
      .get('/unknown')
      .send()
      .then((err, res) => res.body.status.should.equal(404));
  });
});
