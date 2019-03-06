 function EasyHTTP() {
   this.http = new XMLHttpRequest();
 }

 //Make an http GET Request
 EasyHTTP.prototype.get = function (url, callback) {
   this.http.open('GET', url, true);
   this.http.onload = function () {
      if(this.http.status === 200){
        callback(null, this.http.responseText) ;
      }else{
        callback(`Error: ${this.http.status}`);
      }
   }.bind(this);

   this.http.send();
 }

 //Make an http POST Request
 //Make an http PUT Request
 //Make an http DELETE Request