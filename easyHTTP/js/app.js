const http = new EasyHTTP();

//get posts
http.get('https://jsonplaceholder.typicode.com/posts', loadPosts);

function loadPosts(error, response){
  if(error){
    console.log(error);
  }else{
    console.log(response);
  }
  
}