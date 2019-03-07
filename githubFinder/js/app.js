//initializing object
const github = new Github();
const ui = new UI();

//Search input
const searchInput = document.querySelector('#search-user');

//search input event Listener
searchInput.addEventListener('keyup', (e) => {
  //get input text
  const userText = e.target.value;
  if (userText !== '') {
    github.getUsers(userText)
      .then(data => {
        if (data.profile.message === 'Not Found') {
          ui.showAlert('User Not Found', 'alert alert-danger');
        } else {
          ui.showProfile(data.profile);
        }
      });
  } else {
    // Clear profile
    ui.clearProfile();
  }
});