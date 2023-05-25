import APIerror from '../../errors/APIerror';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    await delay(500);

    const response = await fetch(`${this.baseURL}${path}`);

    let body = null;
    const contentType = response.headers.get('Content-Type');

    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    // console.log(body);

    throw new APIerror(response, body);
  }

  async post(path, body) {
    await delay(500);

    // const headers = new Headers({
    //   'Content-Type': 'application/json',
    // });

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');

    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    // console.log(body);

    throw new APIerror(response, responseBody);
  }
}

export default HttpClient;
