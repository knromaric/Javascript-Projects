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
    items: [{
        id: 0,
        name: 'Steak Dinner',
        calories: 1200
      },
      {
        id: 1,
        name: 'Cookies',
        calories: 400
      },
      {
        id: 2,
        name: 'Eggs',
        calories: 300
      }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // public members
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function(name, calories){
      //generate
      let ID; 
      if(data.items.length > 0){
         ID = data.items.length;
      }else{
        ID = 0;
      }
     
      calories = parseInt(calories);
      const newItem = new Item(ID, name, calories);
      //add to items Array
      data.items.push(newItem);
      return newItem;
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
    addBtn: '.add-btn'
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
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value ,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    ClearInputs: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
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
  const itemAddSubmit = function(e) {
   
    const input = UICtrl.getItemInput();
    UICtrl.ClearInputs();
    if(input.name !== '' && input.calories !==''){
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    }

    console.log(ItemCtrl.getItems());
    e.preventDefault();
  }

  //public members
  return {
    init: function () {
      //fetch items from datastructure
      const items = ItemCtrl.getItems();
      //Populate list with items
      UICtrl.populateItemList(items);
      //load event listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

App.init();