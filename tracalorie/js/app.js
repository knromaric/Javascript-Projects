//storage Controller

// Item Controller
const ItemCtrl = (function () {
  //  Item contructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // data/state structure
  const data = {
    items: [],
    currentItem: null,
    totalCalories: 0
  };

  // public members
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      //generate
      let ID;
      if (data.items.length > 0) {
        ID = data.items.length;
      } else {
        ID = 0;
      }

      calories = parseInt(calories);
      const newItem = new Item(ID, name, calories);
      //add to items Array
      data.items.push(newItem);
      return newItem;
    },
    getTotalCalories: function(){
      let total = 0;
      total = data.items.reduce((totalCalories, item)=>{
        return totalCalories+item.calories;
      }, total);
      data.totalCalories = total;
      return data.totalCalories;
    },
    logData: function () {
      return data;
    }
  }

})();
// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    addBtn: '.add-btn',
    totalCalories: '.total-calories'
  }

  //Public members
  return {
    populateItemList: function (items) {
      let listHTML = '';
      items.forEach(item => {
        listHTML += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fas fa-pencil-alt"></i>
        </a>
      </li>`
      });
      document.querySelector(UISelectors.itemList).innerHTML = listHTML;
    },
    addListItem: function (newItem) {
      document.querySelector(UISelectors.itemList).style.display = 'block';
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${newItem.id}`;
      li.innerHTML = `<strong>${newItem.name}: </strong> 
       <em>${newItem.calories} Calories</em>
       <a href="#" class="secondary-content">
         <i class="edit-item fas fa-pencil-alt"></i>
       </a>`;

      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);

    },
    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    ClearInputs: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    getSelectors: function () {
      return UISelectors;
    }
  };
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  const UISelectors = UICtrl.getSelectors();
  //load event listeners
  const loadEventListeners = function () {
    //Add item event

    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  //add Item submit
  const itemAddSubmit = function (e) {

    const input = UICtrl.getItemInput();
    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // Add newItem to UIlist
      UICtrl.addListItem(newItem);
      // Get Total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //display total calories to the UI
      UICtrl.showTotalCalories(totalCalories);
      //clear inputs
      UICtrl.ClearInputs();
    }

    e.preventDefault();
  }

  //public members
  return {
    init: function () {
      //fetch items from datastructure
      const items = ItemCtrl.getItems();
      //check if any items
      if(items.length === 0){
        UICtrl.hideList();
      }else{
        //Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get Total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //display total calories to the UI
      UICtrl.showTotalCalories(totalCalories);
      //load event listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

App.init();