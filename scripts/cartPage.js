// import { GLOBAL_CART_LIST_ITEM } from "./fetchApi.js";

let containerSectionElement = document.getElementById("cart-card-container");
const cartCounter = document.getElementById('CounterCart');
const totalPriceSpan = document.getElementById('total-price');


function calculateTotalPrice(cartItemList) {
    let totalPrice = 0;
    for (const item of cartItemList) {
        totalPrice += item['price'] * item['counter'];
    }
    totalPriceSpan.textContent = totalPrice.toFixed(2) + ' $';
}

function readCartItems() {
    containerSectionElement.innerHTML = "";

    let readCartItemList = JSON.parse(window.localStorage.getItem("cartItemList")) || [];
    if (readCartItemList.length === 0) {
        containerSectionElement.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceSpan.textContent = "0.00 $";
        cartCounter.textContent = 0;
        return;
    }
    calculateTotalPrice(readCartItemList)
    cartCounter.textContent = readCartItemList.length;

    if (readCartItemList && readCartItemList.length > 0) {
        for (let index = 0; index < readCartItemList.length; index++) {
            const item = readCartItemList[index];
            containerSectionElement.innerHTML += `
               <div class="productContent">
    <div class="productDetails">
        <img class="productImage" src="${item.image}" alt="${item.category}">
      
    </div>  <div class="productInfo">
            <p class="productTitle">${item.title}</p>
            <button class="removeBtn" onclick="removeCartItem(${item.id})">Remove</button>
        </div>
    <div class="productActions">
        <button onclick="decrementItem(${item.id})" class="mincbtn">-</button>
        <input type="text" readonly class="counterStyle" value="${item.counter}">
        <button onclick="incrementItem(${item.id})" class="plusbtn">+</button>
    </div>
</div>
                <br>`;
        }
    }
}

function incrementItem(id) {
    let localCartItemList = JSON.parse(window.localStorage.getItem("cartItemList"));
    let selectedCartItem = localCartItemList.find(item => item.id === id);
    if (Number(selectedCartItem.counter) < 100) {
        selectedCartItem.counter = Number(selectedCartItem.counter) + 1;
        window.localStorage.setItem("cartItemList", JSON.stringify(localCartItemList));
        readCartItems();
    }
}

function decrementItem(id) {
    let localCartItemList = JSON.parse(window.localStorage.getItem("cartItemList"));
    let selectedCartItem = localCartItemList.find(item => item.id === id);
    if (Number(selectedCartItem.counter) > 1) {
        selectedCartItem.counter = Number(selectedCartItem.counter) - 1;
        window.localStorage.setItem("cartItemList", JSON.stringify(localCartItemList));
        readCartItems();
    }
}

function removeCartItem(id) {
    let localCartItemList = JSON.parse(window.localStorage.getItem("cartItemList"));
    localCartItemList = localCartItemList.filter(item => item.id !== id);
    window.localStorage.setItem("cartItemList", JSON.stringify(localCartItemList));
    readCartItems(); // Re-render the cart to reflect the updated list
}




readCartItems();