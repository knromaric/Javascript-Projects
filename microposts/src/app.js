import {http} from './http';
import {ui} from './ui';

//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen to add post 
ui.postSubmit.addEventListener('click', submitPost);

//List to delete post
ui.posts.addEventListener('click',deletePost);

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

//delete post 
function deletePost(e){
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')){
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data=> {
          ui.showAlert('Post Removed', 'alert alert-success');
          getPosts();
        })
        .catch(err=>console.log(err));
  }
}