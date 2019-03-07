const http = new EasyHTTP();

//Get Users
// http.get('https://jsonplaceholder.typicode.com/users')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

//user data
const data = {
  name: 'rom ze', 
  username: 'roze',
  email: 'rze@gmail.com'
}

//create post
// http.post('https://jsonplaceholder.typicode.com/users', data)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

//create put
// http.put('https://jsonplaceholder.typicode.com/users/1', data)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

//create DELETE
// http.delete('https://jsonplaceholder.typicode.com/users/1')
//   .then((data) => console.log(data))
//   .catch(err => console.log(err));