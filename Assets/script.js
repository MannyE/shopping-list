const itemForm = document.getElementById('item-form');
const inputField = document.getElementById('input-field');
const itemList = document.getElementById('item-list');
const clear = document.getElementById('clear-button');
const filter = document.getElementById('filter-field');

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
    
        checkUI();
}

function clearList(e) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    checkUI();
}

function removeItem(e) {
    if (e.target.classList.contains('delete-button') ) {
        // Need to target the x but delete the list item
        // How do we select the item then?
            // Go to the parent element (in this case an li, and remove the element)
        
        if (confirm ('Are you sure')) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
}

function checkUI(e) {
    // A function that checks if the the list is populated or not
    console.log("Checked")
    let items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clear.style.display ='none';
        filter.style.display ='none';
    }

    else {
        clear.style.display ='block';
        filter.style.display ='block';
    }
}

// Event Listeners

// 1: Adding an item to the list
itemForm.addEventListener('submit', addItem);

// 2: Removing all items from the list
clear.addEventListener('click', clearList);

// 3: Removing an item from the list (Using Event Delegation)
itemList.addEventListener('click', removeItem);

checkUI();