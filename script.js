import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

const appSettings = {
    apiKey: "AIzaSyB60K2X7Zzko6kUz1TZTlstUl61YTWtVGY",
    authDomain: "cart-item-cf4a6.firebaseapp.com",
    databaseURL: "https://cart-item-cf4a6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cart-item-cf4a6",
    storageBucket: "cart-item-cf4a6.appspot.com",
    messagingSenderId: "272422035574",
    appId: "1:272422035574:web:5c5e26b90427ebc32c7f57"
};

const app = initializeApp(appSettings)
const database = getDatabase(app)
const cartItem = ref(database, "cart")
var item = document.getElementById('cartValue')
var cart_items = document.getElementById('cart-items')
const contextMenu = document.querySelector('.context-menu')

onValue(cartItem, function(snapshot){
    if(snapshot.val() != null){
        cart_items.innerHTML = null
        let itemValues = Object.values(snapshot.val())
        let itemIds = Object.keys(snapshot.val())
        for(let i=0;i<itemValues.length;i++){
            let listElement = document.createElement("li")
            listElement.textContent = itemValues[i]
            cart_items.append(listElement)
            listElement.addEventListener('contextmenu', function(e){
                e.preventDefault()
                showContextMenu(e,"block",itemIds[i])
                window.addEventListener('click', function(){
                    contextMenu.style.display = display
                })
            })
        }
    }
    else{
        cart_items.style.justifyContent = 'center'
        cart_items.innerHTML = "No items"
    }
})

function showContextMenu(e, display, selectedItem){
    contextMenu.style.top = e.y + contextMenu.clientHeight > window.innerHeight ? window.innerHeight - contextMenu.clientHeight : e.y
    contextMenu.style.left = e.x + contextMenu.clientWidth > window.innerWidth ? window.innerWidth - contextMenu.clientWidth : e.x
    contextMenu.style.display = display
    var option = document.querySelectorAll('.context-menu > #items > li')
    option.forEach(element => {
        element.addEventListener('click', function(){
            if(element.innerHTML == 'Update') updateItem()
            else deleteItem(selectedItem)
            return
        })
    });
}

function updateItem(){
    console.log("UPDATED")
}

function deleteItem(selectedItem){
    remove(ref(database, "cart/"+selectedItem))
}

document.getElementById('submitBtn').addEventListener('click', function(){
    if(item.value != ''){
        push(cartItem,item.value)
        item.value = ""
    }
})