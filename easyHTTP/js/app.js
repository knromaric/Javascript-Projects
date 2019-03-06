const http = new EasyHTTP();

//get posts
// http.get('https://jsonplaceholder.typicode.com/posts', loadPosts);

// function loadPosts(error, response){
//   if(error){
//     console.log(error);
//   }else{
//     console.log(response);
//   }
// }

//POST 
const data = {
  title: 'roma in the building',
  body: 'This is my year'
}
// http.post('https://jsonplaceholder.typicode.com/posts', data,  addPost)

// function addPost(error, response){
//   if(error){
//     console.log(error);
//   } else {
//     console.log('response: ', response);
//   }
// }

//PUT

// http.put('https://jsonplaceholder.typicode.com/posts/1', data, updatePost);

// function updatePost(error, response) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('response: ', response);
//   }
// }

//DELETE

http.delete('https://jsonplaceholder.typicode.com/posts/1', deletePost);

function deletePost(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log('POST DELETED');
  }
}