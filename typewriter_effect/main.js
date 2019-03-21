const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.wait = parseInt(wait, 10);
  this.txt = '';
  this.wordIndex = 0;
  this.type();
  this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function () {
  //current index of words
  const current = this.wordIndex % this.words.length;
  //get full text of current word
  const fullTxt = this.words[current];
  //Initial Type Speed
  let typeSpeed = 300; 
  //check if deleting
  if (this.isDeleting) {
    typeSpeed /= 2;
    //remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

 //insert txt into the element
 this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`
// if word is complete
if(!this.isDeleting && this.txt === fullTxt){
  //Make pause at end
  typeSpeed = this.wait;
  //set delete to true
  this.isDeleting = true;
}else if(this.isDeleting && this.txt === ''){
  this.isDeleting = false;
  //move to the next word
  this.wordIndex ++;
  //pause before typing
  typeSpeed = 500;
}
  setTimeout(() => this.type(), typeSpeed);
}
//Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

//init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  //ini typewriter
  new TypeWriter(txtElement, words, wait);
}