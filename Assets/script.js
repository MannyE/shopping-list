const itemForm = document.getElementById('item-form');
const inputField = document.getElementById('input-field');
const itemList = document.getElementById('item-list');
const clear = document.getElementById('clear-button');
const deleteButton = document.getElementByClassName('delete-button');


// Event functions

function addItem (e) {
    e.preventDefault();

    if (e.target[0].value.length > 0) {
        const item = document.createElement('li');
        const p = document.createElement('p');
        const div = document.createElement('div');
        div.classList.add("item");
        const img = document.createElement('img');
        img.classList.add("delete-button");
        img.src = 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLWljb24tMDU2LnBuZw.png';
        
        
        const pContent = document.createTextNode(e.target[0].value);
        p.append(pContent);
        div.append(p);
        div.append(img);

        item.append(div);
        itemList.append(item);
        console.log(img.classList);
    }
    else
        alert("Enter item");
}

function clearList(e) {
    e.preventDefault();
    itemList.innerHTML = '';
}

function removeItem(e) {
    e.removeItem(e.current);
}


// Event Listeners

// 1: Adding an item to the list
itemForm.addEventListener('submit', addItem);

// 2: Removing all items from the list
clear.addEventListener('click', clearList);

// 3: Removing an item from the list
deleteButton.addEventListener('click', removeItem);


