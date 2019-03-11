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
    getItemById: function (id) {
      let found = null;
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
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
    updateItem: function (name, calories) {
      calories = parseInt(calories);
      let found = null;
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    getTotalCalories: function () {
      let total = 0;
      total = data.items.reduce((totalCalories, item) => {
        return totalCalories + item.calories;
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
    listItems: '#item-list li',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    backBtn: '.back-btn',
    deleteBtn: '.delete-btn',
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
    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      //turn Node list into Array
      listItems = Array.from(listItems);
      listItems.forEach(function (listItem) {
        const itemId = listItem.getAttribute('id');
        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `
          <strong>${item.name}: </strong> 
          <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fas fa-pencil-alt"></i>
          </a>
          `;
        }
      });
    },
    showTotalCalories: function (totalCalories) {
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
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    clearEditState: function () {
      UICtrl.ClearInputs();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
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

    //disable submit on Enter
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    //edit icon Click event 
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    //update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

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

  // Edit Item click
  const itemEditClick = function (e) {
    if (e.target.classList.contains('edit-item')) {
      //get the list item id(item-id)
      const listId = e.target.parentNode.parentNode.id;
      const listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);
      const ItemToEdit = ItemCtrl.getItemById(id);
      //set current Item
      ItemCtrl.setCurrentItem(ItemToEdit);
      //add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  }

  // Update Item Click
  const itemUpdateSubmit = function (e) {
    //get Item input
    const input = UICtrl.getItemInput();

    //update item
    const updateItem = ItemCtrl.updateItem(input.name, input.calories);
    //update ui
    UICtrl.updateListItem(updateItem);
    // Get Total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //display total calories to the UI
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearEditState();
    e.preventDefault();
  }

  //public members
  return {
    init: function () {
      //clear edit state /set initial set
      UICtrl.clearEditState();
      //fetch items from datastructure
      const items = ItemCtrl.getItems();
      //check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
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