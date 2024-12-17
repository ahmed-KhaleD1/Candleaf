// export class FetchAPI {
//     #listData = [];
//     #URL = "";
//     constructor(url) {
//         this.#URL = url;
//         (async function(){
//             try {
//                 let product = await fetch(url);
//                 let itemList = await product.json();
//                 window.localStorage.setItem("listOfItems", JSON.stringify(itemList));
//                 this.#listData = JSON.parse(window.localStorage.getItem("listOfItems"));
//                 console.log(this.#listData);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         })();
//     }

//     getAllItems() {
//         return this.#listData;
//     }
    
//     getItemById(id) {
//         return this.#listData.find((item) => {item.id == id});
//     }
// }

export var GLOBAL_CART_LIST_ITEM = [];