/**
 * EasyHTTP Library
 * Library for making http request
 * 
 * @version 2.0.0
 * @author Rom
 * @licence MIT
 *  
 */

class EasyHTTP {
  //make HTTP GET Request
  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  //make HTTP POST request
  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const resData = response.json();
    return resData;
  }

  async put(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const resData = await response.json();
    return resData;
  }

  async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE'
    })
    const resData = await "Resource deleted";
    return resData;

  }
}