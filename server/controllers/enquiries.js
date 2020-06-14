import { join } from 'path';
import EnquiriesService from '../services/enquiries';
import mailer from '../utils/mailer';

export default class Enquiries {
  static async create(req, res) {
    try {
      const newEnquiry = await EnquiriesService.createNewEquiry(req.body);
      if (newEnquiry) {
        await mailer([{
          names: req.body.names,
          email: req.body.email,
          message: req.body.message,
        }, {
          to: 'mugishaalainc@gmail.com',
          subject: 'New Enquiry for KFTV studio',
        }, {
          path: join(__dirname, '../public/templates/notification.ejs'),
        }]);
        return res.status(201).send({ status: 201, message: 'Enquiry created' });
      }
      return res.status(400).send({ status: 400, message: 'Could not create enquiry', error: 'BAD_REQUEST' });
    } catch (error) {
      return res.status(500).send({ status: 500, message: error.message || error, error: 'SERVER_ERROR' });
    }
  }
}
