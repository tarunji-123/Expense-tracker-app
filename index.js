
var form = document.getElementById('my-form');
var items = document.getElementById('items');

var amountInput = document.getElementById('amount');
var descInput = document.getElementById('desc');
var categoryInput = document.getElementById('category');

form.addEventListener('submit', addItems);
// items.addEventListener('click',removeItem);
// items.addEventListener('click',editItems);
items.addEventListener('click', handleItemClick);

function handleItemClick(e) {
    if (e.target.classList.contains('delete')) {
        removeItem(e);
    } else if (e.target.classList.contains('edit')) {
        editItems(e);
    }
}


function addItems(e){
    e.preventDefault();

    var amount = amountInput.value
    var desc = descInput.value
    var category = categoryInput.value

    var li = document.createElement('li');
    li.className = "item mx-2";

    var delBtn = document.createElement('input');
    delBtn.type = "button";
    delBtn.value = "delete";
    delBtn.className = "delete mx-2";

    var editBtn = document.createElement('input');
    editBtn.type = "button";
    editBtn.value = "edit";
    editBtn.className = "edit mx-2";

    li.appendChild(document.createTextNode(amount));
    li.appendChild(document.createTextNode("-" + desc));
    li.appendChild(document.createTextNode("-" + category));
    li.appendChild(delBtn);
    li.append(editBtn);

    items.appendChild(li);
    let myObj = {
        amount : amount,
        desc : desc,
        category : category
    }

    let myObj_serialized = JSON.stringify(myObj);
    localStorage.setItem(desc, myObj_serialized);

    amountInput.value = " ";
    descInput.value = " ";
    categoryInput.value = " ";
}

function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you confirm')){
            var li = e.target.parentElement;

            var desc = li.childNodes[1].textContent.substring(1);
            items.removeChild(li);
            localStorage.removeItem(desc);

            amountInput.value = " ";
            descInput.value = " ";
            categoryInput.value = " ";
        }
    }
}

function editItems(e){
    var li = e.target.parentElement;

    var amount = li.childNodes[0].textContent;
    var desc = li.childNodes[1].textContent.substring(1);
    var category = li.childNodes[2].textContent.substring(2);

    amountInput.value = amount;
    descInput.value = desc;
    categoryInput.value = category;

    // items.removeChild(li);
    // localStorage.removeItem(desc);
    li.remove(); 

  
    var storedItem = localStorage.getItem(desc);
    if (storedItem) {
        localStorage.removeItem(desc);
    }

}

