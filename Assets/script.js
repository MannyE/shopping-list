// Variable Declaration
const itemForm = document.getElementById("item-form");
const inputField = document.getElementById("input-field");
const itemList = document.getElementById("item-list");
const clear = document.getElementById("clear-button");
const filterField = document.getElementById("filter-field");

// Event functions : Includes session Storage functionality
function addItem(e) {
  e.preventDefault();

  function addtoDom(e) {
    if (e.target[0].value.length > 0) {
      const item = document.createElement("li");
      const p = document.createElement("p");
      const div = document.createElement("div");
      div.classList.add("item");
      const img = document.createElement("img");
      img.classList.add("delete-button");
      img.src = "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLWljb24tMDU2LnBuZw.png";

      const pContent = document.createTextNode(e.target[0].value);
      p.append(pContent);
      div.append(p);
      div.append(img);

      item.append(div);
      itemList.append(item);
      console.log(img.classList);
    } else alert("Enter item");
  }

  function addtoStorage() {
    let itemsFromStorage;
    if (sessionStorage.getItem("items") === null) {
      itemsFromStorage = [];
    } else {
      itemsFromStorage = JSON.parse(sessionStorage.getItem("items"));
    }

    if (itemsFromStorage.includes(e.target[0].value)) {
      alert("Item already exists");
      return;
    }

    itemsFromStorage.push(e.target[0].value);
    itemsFromStorage = JSON.stringify(itemsFromStorage);
    sessionStorage.setItem("items", itemsFromStorage);
    addtoDom(e);
  }
  addtoStorage(e);

  e.target[0].value = "";
  checkUI();
}

function clearList(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  sessionStorage.clear();
  checkUI();
}

function removeItem(e) {
  if (e.target.classList.contains("delete-button")) {
    // Need to target the x but delete the list item
    // How do we select the item then?
    // Go to the parent element (in this case an li, and remove the element)

    if (confirm("Are you sure")) {
      e.target.parentElement.parentElement.remove();
      listElement = sessionStorage.getItem("items");
      listElement = JSON.parse(listElement);
      elementToDelete = e.target.parentElement.firstChild.textContent;

      listElement.forEach((item) => {
        if (item === elementToDelete) {
          listElement.splice(listElement.indexOf(item), 1);
        }
      });
      sessionStorage.setItem("items", JSON.stringify(listElement));
      checkUI();
    }
  }
}

function checkUI(e) {
  // A function that checks if the the list is populated or not
  console.log("Checked");
  let items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clear.style.display = "none";
    filterField.style.display = "none";
  } else {
    clear.style.display = "block";
    filterField.style.display = "block";
  }
}

function filter(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".item").forEach(function (item) {
    let listElement = item.querySelector("p").textContent.toLowerCase();

    if (listElement.indexOf(text) != -1) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}

function checkStorage(e) {
  if (sessionStorage.getItem("items") !== null) {
    let itemsFromStorage = JSON.parse(sessionStorage.getItem("items"));
    itemsFromStorage.forEach((item) => {
      const listItem = document.createElement("li");
      const p = document.createElement("p");
      const div = document.createElement("div");
      div.classList.add("item");
      const img = document.createElement("img");
      img.classList.add("delete-button");
      img.src = "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLWljb24tMDU2LnBuZw.png";

      const pContent = document.createTextNode(item);
      p.append(pContent);
      div.append(p);
      div.append(img);

      listItem.append(div);
      itemList.append(listItem);
    });
    checkUI();
  }
}

// Event Listeners

// 1: Adding an item to the list
itemForm.addEventListener("submit", addItem);

// 2: Removing all items from the list
clear.addEventListener("click", clearList);

// 3: Removing an item from the list (Using Event Delegation)
itemList.addEventListener("click", removeItem);

// 4: Filtering the list
filterField.addEventListener("input", filter);

// 5: Loading elements from session storage
window.addEventListener("DOMContentLoaded", checkStorage);

checkUI();
