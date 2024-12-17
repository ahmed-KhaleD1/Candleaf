let productsGridElement = document.getElementById("products-grid");
const slider = document.getElementById("slider");
const slideLeft = document.getElementById("slideLeft");
const slideRight = document.getElementById("slideRight");
const categoryTagsList = document.getElementById('categoryTags');
const cartCounter = document.getElementById('CounterCart');

let cartItemList = [];
let allProductList = [];
let categoryList = [];


function changeCategory(event, selectedCategory) {

    document.querySelectorAll('.activeCategoryText').forEach(tab => {
        tab.classList.remove('activeCategoryText');
        tab.classList.add('inactiveCategoryText');
    });

    event.target.classList.add('activeCategoryText');
    event.target.classList.remove('inactiveCategoryText');


    const filteredList = selectedCategory === 'ALL'
        ? allProductList
        : allProductList.filter(product => product.category === selectedCategory);

    AddDataIntoHTML(filteredList);
}


async function categorize() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        categoryList = await response.json();
        categoryList.unshift('ALL');


        categoryList.forEach((category, index) => {
            let tab = document.createElement('a');
            tab.classList.add(index === 0 ? 'activeCategoryText' : 'inactiveCategoryText');
            tab.textContent = category;
            tab.onclick = (event) => changeCategory(event, category);
            categoryTagsList.appendChild(tab);
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}


function populateSliderWithProducts() {
    slider.innerHTML = "";
    let sortedProducts = [...allProductList.sort((a, b) => b.rating.count - a.rating.count)]
    console.log(sortedProducts);
    sortedProducts.forEach(product => {
        slider.innerHTML += `
            <div class="category-item">
                <img src="${product.image}" alt="${product.title}">
                <p class="product-name">${product.title}</p>
                <p class="product-price">${product.rating.count} times</p>
            </div>
        `;
    });
}

function viewDetails(id) {
    const product = allProductList.find(item => item.id === id);
    if (product) {
        window.localStorage.setItem("item-view", JSON.stringify(product));
    }
}


slideLeft.addEventListener("click", () => {
    slider.scrollLeft -= 200;
});

slideRight.addEventListener("click", () => {
    slider.scrollLeft += 200;
});



let AddDataIntoHTML = (itemList) => {
    productsGridElement.innerHTML = "";
    if (itemList.length > 0) {
        for (let index = 0; index < itemList.length; index++) {
            console.log("print all data");
            productsGridElement.innerHTML += `  
            <div id="productItem">
            <img id="productImage"
                src="${itemList[index].image}">
            <div id="productDetails">
                <div id="productDetailsText">
                  <div id='productTitle'>  <p id="item-title">${itemList[index].title}</p> </div>
                    <p id="productPrice">${itemList[index].price}$</p>
                </div>
            </div>
            <div id="action-icons">
                <a href="./productDetails.html" onclick="viewDetails(${itemList[index].id})">
                    <i class="fa fa-eye iconStyle" aria-hidden="true"></i></a>
                    <a style="cursor:pointer;" onclick="addCartItem(${itemList[index].id})">
                    <i class="fa fa-cart-plus iconStyle" aria-hidden="true"></i>
                    </a>
                    </div>
            </div>`;
        }
    } else {
        alert("There is an issue");
    }
};
async function getData() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        allProductList = await response.json();
        window.localStorage.setItem("listOfItems", JSON.stringify(allProductList));

        cartItemList = JSON.parse(window.localStorage.getItem("cartItemList")) || [];
        cartCounter.textContent = cartItemList.length;

        AddDataIntoHTML(allProductList);
        populateSliderWithProducts();
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}

let signOutBtnElement = document.getElementById("signOutBtn");
let userNameElement = document.getElementById("userName");
userNameElement.innerText = window.localStorage.getItem("name");
signOutBtnElement.addEventListener("click", function () {
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("email");
    window.location.href = "loginPage.htm";
});

function showSnackbar(message, color) {
    var snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    snackbar.textContent = message;
    snackbar.style.backgroundColor = color;
    setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

function addCartItem(id) {
    let existingProduct = cartItemList.find((item) => item.id == id);

    if (existingProduct) {
        showSnackbar('This product has already been added to your Cart', "red");
    } else {

        let localItemList = JSON.parse(window.localStorage.getItem("listOfItems"));
        let selectedItem = localItemList.find(item => item.id === id);
        selectedItem.counter = 1;
        cartItemList.push(selectedItem);
        window.localStorage.setItem("cartItemList", JSON.stringify(cartItemList));
        showSnackbar('product add Successfully', "green");

        cartCounter.textContent = cartItemList.length;
    }

}


window.onload = async () => {
    await getData();
    await categorize();
};
