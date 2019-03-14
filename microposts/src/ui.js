class UI {
  constructor(){
    this.posts = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts){
    let output = '';
    posts.forEach(post => {
      output+= `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fas fa-pencil-alt"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fas fa-times"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.posts.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.postsContainer');
    const cardForm  = document.querySelector('.card-form');
    container.insertBefore(div, cardForm);

    //timeout

    setTimeout(() => {
     this.clearAlert();
    }, 2000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if(currentAlert){
      currentAlert.remove();
    }
  }

  clearInputs(){
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  clearIdInputs(){
    this.idInput.value = '';
  }

  fillForm(data){
    this.idInput.value = data.id;
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;

    this.changeFormState('edit');
  }

  //change the form state
  changeFormState(type){
    if(type === 'edit'){
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      //create a cancel button 
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-outline-info btn-block';
      button.appendChild(document.createTextNode("Cancel Edit"));
      const cardForm = document.querySelector('.card-form');
      const formEnd = document.querySelector('.form-end');
      cardForm.insertBefore(button, formEnd);
    }else{
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      if(document.querySelector('.post-cancel')){
        document.querySelector('.post-cancel').remove(); 
      }

      //clear ID from hidden field
      this.clearIdInputs();
      //clear fields(title, body)
      this.clearInputs();
    }
  }
}

export const ui = new UI();