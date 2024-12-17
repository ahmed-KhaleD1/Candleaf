const productTable = document.getElementById('productTable');
const totalPriceTag =document.getElementById('totalPrice');


function onBack(){
    window.localStorage.removeItem('cartItemList');
    window.location.assign('./homePage.html');
}

function displayOrdaredProduct() {
    var ordaredItem = window.localStorage.getItem('cartItemList');
    if (!ordaredItem) {
        console.log("No items found in the cart.");
        return;
    }
    ordaredItem = JSON.parse(ordaredItem);
    var totalPrice=0;
    ordaredItem.forEach(element => {
        var totalProductPrice = element.counter * element.price;
        totalPrice+=totalProductPrice;
        productTable.innerHTML += `
    <div class="col-2 tableRow" id="productImage"><img src="${element.image}" alt="${element.title}" class="col-5"></div>
                        <div class="col-3 tableRow" >${element.title}</div>
                        <div class="col-2 tableRow" >${element.price.toFixed(2)} $</div>
                        <div class="col-2 tableRow" >${element.counter}</div>
                        <div class="col-2 tableRow" >${totalProductPrice.toFixed(2)} $</div>
    `
    });
    totalPriceTag.textContent=totalPrice.toFixed(2)+' $';
}

displayOrdaredProduct()