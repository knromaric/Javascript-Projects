import {http} from './http';
import {ui} from './ui';

//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen to add post 
ui.postSubmit.addEventListener('click', submitPost);

//get posts
function getPosts(){
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data) )
    .catch(err=>console.log(err));
}

//submit post
function submitPost(e){
  const title = ui.titleInput.value;
  const body = ui.bodyInput.value;
  
  const data = {
    title,
    body
  };

  http.post('http://localhost:3000/posts', data)
    .then(data => {
      ui.showAlert('Post Added', 'alert alert-success');
      ui.clearInputs();
      getPosts();
    })
    .catch(err=>console.log(err));
};