/** 
 * SINGLETON PATTERN
 */

 const singleton = (function(){
  let instance;

  function createIntance() {
    const object = new Object({name: 'roma'});
    console.log('first call');
    return object
  }

  return {
    getInstance: function(){
      if(!instance){
        instance = createIntance();
      }
      return instance;
    }
  }
 })();

 const instanceA = singleton.getInstance();
 const instanceB = singleton.getInstance();
 console.log(instanceA===instanceB);
 console.log(instanceB);