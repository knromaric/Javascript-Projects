/**
 * BASIC STRUCTURE 
 */

// (function(){
//   //declare private variable and functions

//   return {
//     //declare public var and functions
//   }
// })();

/**
 * STANDARD MODULE PATTERN 
 */
// const UICtrl = (function(){
//   let text = 'hello world'; 

//   const changeText =function() {
//     const element = document.querySelector('h1');
//     element.textContent = text;
//   }

//   return {
//     callChangeText: changeText
//   }
// })();

// UICtrl.callChangeText();


const itemCtrl = (function(){
  let data  = [];

  function add(item) {
    data.push(item);
    console.log('item added....');
  }

  function get(id) {
    return data.find((item)=>item.id === id);
  }

  return {
    add,
    get
  }
})();

itemCtrl.add({id:1, name: 'john'});
itemCtrl.add({id:2, name: 'rom'});
console.log(itemCtrl.get(2));
