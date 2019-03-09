const data = [
  {
    name: 'John Doe',
    age: 32, 
    gender: 'male',
    lookingFor: 'female',
    location: 'Boston MA',
    image: 'https://randomuser.me/api/portraits/men/83.jpg'
  },
  {
    name: 'Karl Marx',
    age: 45, 
    gender: 'female',
    lookingFor: 'male',
    location: 'Miami FL',
    image: 'https://randomuser.me/api/portraits/women/83.jpg'
  },
  {
    name: 'Romtchuk',
    age: 50, 
    gender: 'male',
    lookingFor: 'female',
    location: 'Douala CM',
    image: 'https://randomuser.me/api/portraits/men/85.jpg'
  }
];

const profiles = profileIterator(data);

//call first profile
nextProfile();

//next event
document.getElementById('next').addEventListener('click', nextProfile);

//next profile display
function nextProfile(){
  const currentProfile = profiles.next().value;
  if(currentProfile !== undefined){
    document.getElementById('profileDisplay').innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">Name: ${currentProfile.name}</li>
        <li class="list-group-item">Age: ${currentProfile.age}</li>
        <li class="list-group-item">Location: ${currentProfile.location}</li>
        <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingFor}</li>
      </ul>`;
  
    document.getElementById('imageDisplay').innerHTML = `
      <img src="${currentProfile.image}" class="img-fluid"/>
    `;
  }
  else{
    window.location.reload();
  }
}
//profile iterator
function profileIterator(profiles){
  let nextIndex = 0;

  return {
    next : function(){
      //nextIndex = nextIndex%profiles.length;
      return nextIndex<profiles.length 
        ? {value: profiles[(nextIndex++)], done:false}
        : {done: true};
    }
  };
}