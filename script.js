// Initialization of required variables and objects.
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
let collection = [];
let filterButton = new Button('New', document.createElement("button"), '#33a1fd', 'white', 'childFilter', 'filterButton', false, false);
let ownershipTag;
let buttonObjects = [];
let additionalButtons = [];
buttonObjects.push(new Button('Test Category 1', document.createElement("button"), '#33a1fd', 'white', 'category', 'filterButton', 'categoryFilter', false, false));
buttonObjects.push(new Button('Test Brand 1', document.createElement("button"), '#33a1fd', 'white', 'brand', 'filterButton', 'yearFilter', false, false));
buttonObjects.push(new Button('Test Brand 2', document.createElement("button"), '#33a1fd', 'white', 'brand', 'filterButton', 'collectionFilter', false, false));

document.getElementById('options').style.display = 'none'
document.getElementById('add').addEventListener('click', () => showAndHide('options'));
document.getElementById('addNewItem').addEventListener('click', () => showAndHide('options'));
document.getElementById('addCategory').addEventListener('click', () => showAndHide('options'));
document.getElementById('addBrand').addEventListener('click', () => showAndHide('options'));
document.getElementById('filterImgG').addEventListener('click', () => filterMenu('enable'));
document.getElementById('filterImgB').addEventListener('click', () => filterMenu('disable'));

document.getElementById('addNewItem').addEventListener('click', () => {
    //Fixes bug where select boxes duplicate when a new form instantiates and causes applyStyleSelector() to be called.
    if (document.getElementById('filter')) {
        filterMenu('disable');
    }
    let itemForm = new Form('itemPopUp', document.createElement('div'), [], 'itemPopUp', false);
    itemForm.init();
})

document.getElementById('addCategory').addEventListener('click', () => {
    //Fixes bug where select boxes duplicate when a new form instantiates and causes applyStyleSelector() to be called.
    if (document.getElementById('filter')) {
        filterMenu('disable');
    }
    let categoryPopUp = new Form('categoryPopUp', document.createElement('div'), [], 'categoryPopUp', false);
    categoryPopUp.init()
})

document.getElementById('addBrand').addEventListener('click', () => {
    //Fixes bug where select boxes duplicate when a new form instantiates and causes applyStyleSelector() to be called.
    if (document.getElementById('filter')) {
        filterMenu('disable');
    }
    let brandPopUp = new Form('brandPopUp', document.createElement('div'), [], 'brandPopUp', false);
    categoryPopUp.init()
})


/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Required object constructors:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
function Item (name, category, brand, year, owned, cardImage, inContainer) {
    this.name = name;
    this.css = document.createElement('div');
    this.category = category;
    this.brand = brand;
    this.year = year;
    this.owned = owned;
    this.cardImage = cardImage;
    this.inContainer = inContainer;
};

function Button (name, css, fontColor, color, filterType, className, idName, initStatus, state) {
    this.name = name;
    this.css = css;
    this.fontColor = fontColor;
    this.color = color;
    this.filterType = filterType;
    this.className = className;
    this.idName = idName;
    this.initStatus = initStatus;
    this.state = state;
    this.originalState = [name, css, fontColor, color, filterType, className, idName, state];
};

function CollectionButton (cardInstance) {
    Button.apply(this, arguments)
    this.cardInstance = cardInstance;
}

CollectionButton.prototype = Object.create(Button.prototype);

// Form constructor that inistantiates different types of forms.
function Form (name, css, input, type, initValue) {
    this.name = name;
    this.css = css;
    this.input = input;
    this.type = type;
    this.initValue = initValue;
}

/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Prototype Methods for Items:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/

Item.prototype.createCard = function () {
    let middleContainer = document.getElementById('middleContainer')
    this.css.setAttribute('class', 'card')
    middleContainer.appendChild(this.css);
    let modifyContainer = document.createElement('div');
    modifyContainer.setAttribute('id', 'modifyContainer');
    this.css.appendChild(modifyContainer);
    let cardName = document.createElement('div');
    cardName.setAttribute('id', 'cardName');
    cardName.innerHTML = this.name;
    modifyContainer.appendChild(cardName);
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('id', 'deleteButton');
    deleteButton.innerHTML = 'X';
    deleteButton.addEventListener('click', () => {
        document.getElementById('middleContainer').removeChild(this.css);
        //code to be added.
    });
    modifyContainer.appendChild(deleteButton);
    let cardImageContainer = document.createElement('div');
    cardImageContainer.setAttribute('id', 'cardImage');
    this.css.appendChild(cardImageContainer);
    if (this.cardImage === false) {
        this.cardImage = 'Pictures/upload.png';
    }
    let image = document.createElement('img');
    image.src= this.cardImage;
    cardImageContainer.appendChild(image);
    let ownershipTag = document.createElement('div');
    ownershipTag.setAttribute('id', 'ownershipTag');
    this.css.appendChild(ownershipTag);
    if (this.owned === true) {
        let collectionButton = new CollectionButton('Collected', document.createElement("button"), 'white', '#67cf67', 'collection', 'collectionButton', 'collectionButton', false, false)
        collectionButton.init();
    } else if (this.owned === false) {
        let collectionButton = new CollectionButton('Not Collected', document.createElement("button"), 'black', '#fafafa', 'collection', 'collectionButton', 'collectionButton', false, false)
        collectionButton.init();
    }
    let cardContent = document.createElement('div');
    cardContent.setAttribute('id', 'cardContent');
    this.css.appendChild(cardContent);
    let categoryCardText = document.createElement('div');
    categoryCardText.setAttribute('class', 'cardText');
    categoryCardText.setAttribute('id', 'categoryCardText');
    categoryCardText.innerHTML = this.category;
    cardContent.appendChild(categoryCardText);
    let brandCardText = document.createElement('div');
    brandCardText.setAttribute('class', 'cardText');
    brandCardText.setAttribute('id', 'brandCardText');
    brandCardText.innerHTML = this.brand;
    cardContent.appendChild(brandCardText);
}

Item.prototype.init = function () {
    collection.push(this);
    this.createCard();
}

/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Prototype Methods for Buttons:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
Button.prototype.changeState = function() {
    if (this.state === false) {
        this.css.style.backgroundColor = this.fontColor;
        this.css.style.color = this.color;
        document.getElementById('filter').style.display = 'flex';
        this.state = true;
    } else if(this.state = true) {
        this.stateReset();

    }
};


Button.prototype.init = function() {
    this.css.style.backgroundColor = this.color;
    this.css.style.color = this.fontColor;
    this.css.innerHTML = this.name;
    this.css.className = this.className;
    if (this.initStatus === false) {
        this.css.addEventListener('mouseleave', () => {
            if (this.state === false) {
                this.css.style.backgroundColor = this.color;
                this.css.style.color = this.fontColor;
            }
        });
        this.css.addEventListener('mouseenter', () => {
            if (this.state === false) {
                this.css.style.backgroundColor = this.fontColor;
                this.css.style.color = this.color;
            }
        });
        this.css.addEventListener('click', () => this.changeState());
        this.initStatus = true;
    }
    if (this.filterType === 'brand') {
        document.getElementById('brandButtons').appendChild(this.css);
    } else if (this.filterType === 'category') {
        document.getElementById('categoryButtons').appendChild(this.css);
    }
};

Button.prototype.stateReset = function() {
    this.name = this.originalState[0];
    this.css = this.originalState[1];
    this.fontColor = this.originalState[2];
    this.color = this.originalState[3];
    this.filterType = this.originalState[4];
    this.className = this.originalState[5];
    this.idName = this.originalState[6];
    this.initCount = true;
    this.state = this.originalState[7];
};

CollectionButton.prototype.init = function() {
    this.css.style.backgroundColor = this.color;
    this.css.style.color = this.fontColor;
    this.css.innerHTML = this.name;
    this.css.className = this.className;
    this.css.style.width = '200px';
    this.css.style.height = 'auto';
    this.css.style.fontSize = '16px';
    this.css.style.display = 'flex';
    this.css.style.justifyContent = 'center';
    this.css.style.borderRadius = '10px';
    this.css.style.padding = '10px';
    this.css.style.boxShadow = '0px 2px 10px 1px lightgray';

    if (this.initStatus === false) {
        this.css.addEventListener('mouseleave', () => {
            if (this.state === false) {
                this.css.style.backgroundColor = this.color;
                this.css.style.color = this.fontColor;
            }
        });
        this.css.addEventListener('mouseenter', () => {
            if (this.state === false) {
                this.css.style.backgroundColor = '#67cf67';
                this.css.style.color = this.color;
            }
        });
        this.css.addEventListener('click', () => {
            if (this.state === false) {
                this.css.style.backgroundColor = '#67cf67';
                this.css.style.color = '#fafafa';
                this.css.innerHTML = 'Collected';
                this.state = true;
            } else if(this.state = true) {
                this.stateReset();
                this.css.innerHTML = this.name;

            }
        });
        this.initStatus = true;
        document.getElementById('ownershipTag').appendChild(this.css);
    };
}


/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Prototype Methods for Forms:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Init Prototype Method for New Item Form
Form.prototype.init = function (){
    //Activates Overlay and instantiates container for selected form.
    document.getElementById('overlay').classList.add('active');
    this.css.id = this.name;
    document.body.appendChild(this.css);
    this.css.classList.add('active');
    //Instantiates the form for a new item.
    if (this.type === 'itemPopUp') {
        newElement('div','id', 'popUpHeader', this.css);
        newElement('div','id', 'popUpTitle', document.getElementById('popUpHeader'), 'New Item');
        newElement('button','class', 'closeButton', document.getElementById('popUpHeader'), 'X',
        [{type:'click', function:() => {
            document.body.removeChild(this.css);
            document.getElementById('overlay').classList.remove('active');
            }
        }]);
        newElement('div','id', 'popUpBody', this.css);
        newElement('div', false, null, document.getElementById('popUpBody'), 'Item Name:');
        let nameText = document.createElement('input')
        nameText.type = 'text';
        nameText.id = 'nameBox'
        document.getElementById('popUpBody').appendChild(nameText);
        newElement('div', false, null, document.getElementById('popUpBody'), 'Image URL (Not Required):');
        let imgURL = document.createElement('input')
        imgURL.type = 'text';
        imgURL.id = 'imgURL'
        document.getElementById('popUpBody').appendChild(imgURL);
        newElement('div', false, null, document.getElementById('popUpBody'), 'Year:');
        let year = document.createElement('input')
        year.type = 'text';
        year.id = 'yearText'
        document.getElementById('popUpBody').appendChild(year);
        //Cateogry Drop down
        newElement('div', false, null, document.getElementById('popUpBody'), 'Category:', null);
        newSelectBox('custom-select', 'width:200px;', 'Category', 'categorySelect', document.getElementById('popUpBody'),
        [{optionValue:'null', optionText:'----'}])
        //Brand Drop down
        newElement('div', false, null, document.getElementById('popUpBody'), 'Brand:');
        newSelectBox('custom-select', 'width:200px;', 'Category', 'categorySelect', document.getElementById('popUpBody'),
        [{optionValue:'null', optionText:'----'}])
        //Collection Status Drop Down
        newElement('div', false, null, document.getElementById('popUpBody'), 'Collected:');
        newSelectBox('custom-select', 'width:200px;', 'Category', 'categorySelect', document.getElementById('popUpBody'),
        [{optionValue:'null', optionText:'----'}, {optionValue:'null', optionText:'Yes'}, {optionValue:'null', optionText:'No'}])
        newElement('button','id', 'addButton', document.getElementById('popUpBody'), 'Add');
        applySelectorStyle();
        //Instantiates the form for a new category.
    } else if (this.type === 'categoryPopUp') {
        newElement('div','id', 'popUpHeader', this.css);
        newElement('div','id', 'popUpTitle', document.getElementById('popUpHeader'), 'New Category');
        newElement('button','class', 'closeButton', document.getElementById('popUpHeader'), 'X',
        [{type:'click', function:() => {
            document.body.removeChild(this.css);
            document.getElementById('overlay').classList.remove('active');
            }
        }]);
        newElement('div','id', 'popUpBody', this.css);
        let nameText = document.createElement('input')
        nameText.type = 'text';
        nameText.id = 'nameBox'
        document.getElementById('popUpBody').appendChild(nameText);
        newElement('button','id', 'addButton', document.getElementById('popUpBody'), 'Add');
        //Instantiates the form for a new brand.
    } else if (this.type === 'brandPopUp') {
        newElement('div','id', 'popUpHeader', this.css);
        newElement('div','id', 'popUpTitle', document.getElementById('popUpHeader'), 'New Brand');
        newElement('button','class', 'closeButton', document.getElementById('popUpHeader'), 'X',
        [{type:'click', function:() => {
            document.body.removeChild(this.css);
            document.getElementById('overlay').classList.remove('active');
            }
        }]);
        newElement('div','id', 'popUpBody', this.css);
        let nameText = document.createElement('input')
        nameText.type = 'text';
        nameText.id = 'nameBox'
        document.getElementById('popUpBody').appendChild(nameText);
        newElement('button','id', 'addButton', document.getElementById('popUpBody'), 'Add');

    }
    this.initValue = true;
}




/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Utility Functions:
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/

function showAndHide(elementId) {
    if (document.getElementById(elementId).style.display === 'none') {
        document.getElementById(elementId).style.display = 'flex';
    } else if (document.getElementById(elementId).style.display === 'flex')
    document.getElementById(elementId).style.display = 'none';
}

function updateContainer(array) {
    let container = document.getElementById("middleContainer");
    let children = container.childNodes;
    for (i = 0; i < array.length; i++) {
        if (collection[i].inContainer === true) {
            continue
        };
        // Create card here according to prior specs
        let newDiv = document.createElement("div");
        newDiv.textContent = `${array[i].name}, Category: ${array[i].category}, Brand: ${array[i].brand}, Year: ${array[i].year}, Ownership: ${array[i].owned}`;
        container.appendChild(newDiv);
        collection[i].inContainer = true;
    };
}

function filter (arg) {
    if (arg === 'name') {
        collection.sort(function (a,b) {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            }
        });
    }
}

//  Note to self: May not need this function.
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function filterMenu (option) {
    if (option === 'enable') {
    let mainContainer = document.getElementById('mainContainer');
    newElement('div','id', 'filter', mainContainer, false);
    //Make sure that filter appears below topContainer:
    mainContainer.insertBefore(document.getElementById('filter'), mainContainer.children[1]);
    //Left filter container.
    newElement('div','id', 'leftFilterContainer', document.getElementById('filter'), false);
    //Categories
    newElement('div', 'id', 'category', document.getElementById('leftFilterContainer'), 'Category:', null);
    document.getElementById('category').setAttribute('class', 'additionalFilterItems');
    newSelectBox('custom-select', 'width:200px;', 'Category', 'category', document.getElementById('category'),
    [{optionValue:'null', optionText:'----'}])
    //Brands
    newElement('div', 'id', 'brand', document.getElementById('leftFilterContainer'), 'Brand:', null);
    document.getElementById('brand').setAttribute('class', 'additionalFilterItems');
    newSelectBox('custom-select', 'width:200px;', 'Brand', 'brand', document.getElementById('brand'),
    [{optionValue:'null', optionText:'----'}])
    //Right filter Container
    newElement('div','id', 'rightFilterContainer', document.getElementById('filter'), false);
    //Year Select
    newElement('div', 'id', 'year', document.getElementById('rightFilterContainer'), 'Year:', null);
    document.getElementById('year').setAttribute('class', 'additionalFilterItems');
    newSelectBox('custom-select', 'width:200px;', 'Year', 'years', document.getElementById('year'),
    [{optionValue:'null', optionText:'----'}])
    //Collection Status Select
    newElement('div', 'id', 'collectionStatus', document.getElementById('rightFilterContainer'), 'Collected:', null);
    document.getElementById('collectionStatus').setAttribute('class', 'additionalFilterItems');
    newSelectBox('custom-select', 'width:200px;', 'Year', 'years', document.getElementById('collectionStatus'),
    [{optionValue:'null', optionText:'----'}])
    document.getElementById('filterImgG').style.display = 'none';
    document.getElementById('filterImgB').style.display = 'flex';
        applySelectorStyle()
    } else if (option === 'disable') {

        document.getElementById('mainContainer').removeChild(document.getElementById('filter'));
        document.getElementById('filterImgG').style.display = 'flex';
        document.getElementById('filterImgB').style.display = 'none';
    }
}

function newElement (elementType, selector, selectorName, target, content, eventListeners) {
    let element = document.createElement(elementType);
    if (selector === false) {
            if (content) {
                element.innerHTML = content
            }
        target.appendChild(element);
    } else if (content) {
        element.innerHTML = content
        element.setAttribute(selector, selectorName);
        target.appendChild(element);
    } else
    element.setAttribute(selector, selectorName);
    target.appendChild(element);
    if (eventListeners) {
        for (eL of eventListeners) {
            element.addEventListener(eL.type, eL.function)
        }
    }
}

function newSelectBox (classNameDiv, divStyle, selectName, selectId, target, optionArray) {
    let category = document.createElement('div')
    category.setAttribute('class', classNameDiv);
    category.style = divStyle
    target.appendChild(category);
    let select = document.createElement('select')
    select.name = selectName;
    select.id = selectId;
    console.log(select);
    category.appendChild(select);
    newOption(optionArray, select);
}

function newOption (options, target) {
    for (op of options) {
        let option = document.createElement('option');
        option.value = op.optionValue;
        option.innerHTML = op.optionText;
        target.appendChild(option);
    }
}




//document.getElementById('brandPopUp').classList.add('active')
//document.getElementById('overlay').classList.add('active')

/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
// Custom Drop Down Menu
/* ------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------*/
/* Look for any elements with the class "custom-select": */
function applySelectorStyle() {
    let customClass = document.getElementsByClassName("custom-select");
    for (let i = 0; i < customClass.length; i++) {
        let foundSelectElement = customClass[i].getElementsByTagName("select")[0];
        /* For each element, create a new DIV that will act as the selected item: */
        let newSelectedItem = document.createElement("DIV");
        newSelectedItem.setAttribute("class", "select-selected");
        newSelectedItem.innerHTML = foundSelectElement.options[foundSelectElement.selectedIndex].innerHTML;
        customClass[i].appendChild(newSelectedItem);
        /* For each element, create a new DIV that will contain the option list: */
        let newOptionContainer = document.createElement("DIV");
        newOptionContainer.setAttribute("class", "select-items select-hide");
        for (let j = 1; j <foundSelectElement.length; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            newOptionItem = document.createElement("DIV");
            newOptionItem.innerHTML = foundSelectElement.options[j].innerHTML;
            newOptionItem.addEventListener("click", function(e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h, sl, yl;
                selectElement = this.parentNode.parentNode.getElementsByTagName("select")[0];
                selectedItem = this.parentNode.previousSibling;
                console.log(selectedItem);
                console.log(selectedItem.parentNode);
                for (i = 0; i < selectElement.length; i++) {
                    if (selectElement.options[i].innerHTML == this.innerHTML) {
                        selectElement.selectedIndex = i;
                        selectedItem.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        console.log(y)
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                selectedItem.click();
            });
            newOptionContainer.appendChild(newOptionItem);
        }
        customClass[i].appendChild(newOptionContainer);
        newSelectedItem.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);


let newItem = new Item('Test Trading Card', 'TCG', 'Test Card Game', 1999, false, 'Pictures/image_placeholder.png', true)

newItem.init();

console.log(collection);