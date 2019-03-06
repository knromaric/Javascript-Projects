 function EasyHTTP() {
   this.http = new XMLHttpRequest();
 }

 //Make an http GET Request
 EasyHTTP.prototype.get = function (url, callback) {
   this.http.open('GET', url, true);
   this.http.onload = function () {
     if (this.http.status === 200) {
       callback(null, this.http.responseText);
     } else {
       callback(`Error: ${this.http.status}`);
     }
   }.bind(this);

   this.http.send();
 }

 //Make an http POST Request
 EasyHTTP.prototype.post = function (url, data, callback) {
   this.http.open('POST', url, true);
   this.http.setRequestHeader('content-type', 'application/json');

   this.http.onload = function () {
     callback(null, this.http.responseText);
   }.bind(this);

   this.http.send(JSON.stringify(data));
 }


 //Make an http PUT Request

 EasyHTTP.prototype.put = function (url, data, callback) {
  this.http.open('PUT', url, true);
  this.http.setRequestHeader('content-type', 'application/json');

  this.http.onload = function () {
    callback(null, this.http.responseText);
  }.bind(this);

  this.http.send(JSON.stringify(data));
}


 //Make an http DELETE Request

 EasyHTTP.prototype.delete = function (url, callback) {
  this.http.open('DELETE', url, true);
  this.http.onload = function () {
    if (this.http.status === 200) {
      callback(null, this.http.responseText);
    } else {
      callback(`Error: ${this.http.status}`);
    }
  }.bind(this);

  this.http.send();
}