import HttpClient from './utils/HttpClient';

class ContactsServices {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'ASC ') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async createContact(contact) {
    return this.httpClient.post('/contacts', contact);
  }
}

export default new ContactsServices();
