import database from '../database/models/index';

const { enquiries } = database;
export default class Enquiries {
  static async createNewEquiry(rawEnquiry) {
    const newEnquiry = await enquiries.create(rawEnquiry);
    return newEnquiry;
  }
}
