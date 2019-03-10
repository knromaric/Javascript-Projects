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
    logData: function () {
      return data;
    }
  }

})();
// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list'
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
    }
  };
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {

  //public members
  return {
    init: function () {
      //fetch items from datastructure
      const items = ItemCtrl.getItems();
      //Populate list with items
      UICtrl.populateItemList(items);

    }
  }
})(ItemCtrl, UICtrl);

App.init();