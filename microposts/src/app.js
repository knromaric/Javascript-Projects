import {
  http
} from './http';
import {
  ui
} from './ui';

//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen to add post 
ui.postSubmit.addEventListener('click', submitPost);

//Listen to delete post
ui.posts.addEventListener('click', deletePost);

//Listen to Edit State
ui.posts.addEventListener('click', EnableEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

//get posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

//submit post
function submitPost(e) {
  const title = ui.titleInput.value;
  const body = ui.bodyInput.value;
  const id = ui.idInput.value;
  const data = {
    title,
    body
  };

 //validate inputs
  if(title === '' || body === ''){
    ui.showAlert('Please Fill in All fields', 'alert alert-danger');
  }
  else{
    //check for id
    if(id === ''){
      //create post
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post Added', 'alert alert-success');
          ui.clearInputs();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      //update post
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post Updated', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));
    }
  }
};

//delete post 
function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

//Enable Edit 
function EnableEdit(e){
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const data ={
      id,
      title,
      body
    };

    //fill the form with current post
    ui.fillForm(data);
  }

  e.preventDefault();
}

// cancel Edit 

function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add');
  }
  e.preventDefault();
}