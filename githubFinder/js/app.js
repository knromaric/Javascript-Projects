//var github = new Github();

//Search input
const searchInput = document.querySelector('#search-user');

//search input event Listener
searchInput.addEventListener('keyup', (e) => {
  //get input text
  const userText = e.target.value;
  if (userText !== '') {
    Github.getUsers(userText)
      .then(data => {
        if (data.profile.message === 'Not Found') {
          //show alert message
        } else {
          UI.showProfile(data.profile);
        }
      });
  } else {
    // Clear profile
    UI.clearProfile();
  }
});