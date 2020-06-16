/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHTTP from 'chai-http';

import server from '../server';

chai.should();
chai.use(chaiHTTP);

const newEnquiryUrl = '/api/v1/enquiries/new';
const withCorrectInfo = {
  names: 'alex',
  email: 'alex@gmail.com',
  message: 'Can you do movie shoots',
};
const withMissingInfo = {
  email: 'alex@gmail.com',
  message: 'Can you do movie shoots',
};
const withWrongInfo = {
  names: 'al',
  email: 'alex@gmail.com',
  message: 'Can you do movie shoots',
};

describe('/contact-us', () => {
  it('should create an enquiry', () => {
    chai
      .request(server)
      .post(newEnquiryUrl)
      .send(withCorrectInfo)
      .then((err, res) => res.body.status.should.equal(201));
  });

  it('should not create an enquiry with wrong info', () => {
    chai
      .request(server)
      .post(newEnquiryUrl)
      .send(withWrongInfo)
      .then((err, res) => res.body.status.should.equal(422));
  });

  it('should not create an enquiry with missing info', () => {
    chai
      .request(server)
      .post(newEnquiryUrl)
      .send(withMissingInfo)
      .then((err, res) => res.body.status.should.equal(422));
  });
});
