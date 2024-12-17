let productImageTag = document.getElementById('productImage');
let productTitleTag = document.getElementById('productTitle');
let productPriceTag = document.getElementById('productPrice');
let productRatingTag = document.getElementById('productRating');
const cartCounter = document.getElementById('CounterCart');
const productCount = document.getElementById('produdctCount');
const sizeButtons = document.querySelectorAll('.size');

let product ;
function loadDataFromLoaclStorage() {
     product = JSON.parse( window.localStorage.getItem('item-view')||'');

    let cartItemList = JSON.parse(window.localStorage.getItem("cartItemList") || "[]");
    let existingProduct = cartItemList.find(item => item.id === product.id);
    if(existingProduct)
    {
        productCount.value=existingProduct.counter;
    }else {
        productCount.value = 1; 
    }

    cartCounter.textContent = cartItemList.length;

    if (product) {
        displayProuct(product);
    } else {
        console.error("No product data found in localStorage.");
    }
}

function displayProuct(product) {
    productImageTag.src = product.image;
    productTitleTag.textContent = product.title;
    productPriceTag.textContent = `${product.price}$`;
    productRatingTag.dataset.rating = product.rating.rate;
    productRatingTag.lastElementChild.textContent = `(${product.rating.rate})`;

    document.querySelectorAll('.star-display').forEach(starDisplay => {
        const rating = parseFloat(starDisplay.dataset.rating); // Get rating from data attribute
        const stars = starDisplay.querySelectorAll('.star');

        stars.forEach((star, index) => {
            if (index < Math.floor(rating)) {
                // Full stars
                star.classList.add('full');
            } else if (index < Math.ceil(rating)) {
                // Half star
                star.classList.add('half');
            }
        });
    });
}

function incrementItem() {
    let cartItemList = JSON.parse(window.localStorage.getItem("cartItemList") || "[]");
    let selectedCartItem = cartItemList.find(item => item.id === product.id);

    if (selectedCartItem) {
        if (Number(selectedCartItem.counter) < 100) {
            selectedCartItem.counter += 1;
        }
    } else {
        selectedCartItem = { ...product, counter: 2 }; 
        cartItemList.push(selectedCartItem);
    }

    window.localStorage.setItem("cartItemList", JSON.stringify(cartItemList));
    productCount.value = selectedCartItem.counter;
    cartCounter.textContent = cartItemList.length;
}

function decrementItem() {
    let cartItemList = JSON.parse(window.localStorage.getItem("cartItemList") || "[]");
    let selectedCartItem = cartItemList.find(item => item.id === product.id);

    if (selectedCartItem) {
        if (Number(selectedCartItem.counter) > 1) {
            selectedCartItem.counter -= 1;
        } else {
            
            cartItemList = cartItemList.filter(item => item.id !== product.id);
        }
    }

    window.localStorage.setItem("cartItemList", JSON.stringify(cartItemList));
    productCount.value = selectedCartItem?.counter || 1;
    cartCounter.textContent = cartItemList.length;
}

function addToCart(){
    let cartItemList = JSON.parse(window.localStorage.getItem("cartItemList") || "[]");
    let existingProduct = cartItemList.find(item => item.id === product.id);
    if (!existingProduct) {
       
        cartItemList.push({ ...product, counter: Number(productCount.value) });
    }

    window.localStorage.setItem("cartItemList", JSON.stringify(cartItemList));
    cartCounter.textContent = cartItemList.length;

    alert("Product added to cart successfully!");
}

sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
      
        sizeButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');
    });
});

window.onload = (e) => {
    loadDataFromLoaclStorage();
}




