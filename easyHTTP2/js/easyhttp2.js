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
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(res=>res.json())
      .then(data=>resolve(data))
      .catch(err => reject(err))
    })
  }

  //make HTTP POST request
  post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method:'POST',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(data)
      })
      .then(res=>res.json())
      .then(data=>resolve(data))
      .catch(err=>reject(err))
    })
  }

  put(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method:'PUT',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(data)
      })
      .then(res=>res.json())
      .then(data=>resolve(data))
      .catch(err=>reject(err))
    })
  }

  delete(url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'DELETE'
      })
      .then(res=>res.json())
      .then(data=>resolve('resource deleted'))
      .catch(err => reject(err))
    })
  }
}