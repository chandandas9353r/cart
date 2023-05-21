import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import { getDatabase, ref, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

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
let item = document.getElementById('cartValue')
let cart_items = document.getElementById('cart-items')
item.focus()

document.getElementById('submitBtn').addEventListener('click', function(){
    if(item.value != ''){
        push(ref(database, "cart/questions/"),item.value)
        onValue(ref(database, "cart/questions/"), function(snapshot){
            let length = Object.values(snapshot.val()).length
            let key = Object.entries(snapshot.val())[length-1][0]
            let value = Object.entries(snapshot.val())[length-1][1]
            set(ref(database, `cart/${key}/`),{
                'Question': value,
                'Answer': ''
            })
        })
        item.value = ""
        item.focus()
    }
})

onValue(ref(database, "cart/questions/"), function(snapshot){
    if(snapshot.val() == null){
        cart_items.innerHTML = "No items"
        return
    }
    let length = Object.values(snapshot.val()).length
    onValue(ref(database, "cart/"), function(snapshot){
        cart_items.innerHTML = null
        for(let i=0;i<length;i++){
            let listElement = document.createElement('li')
            let questionSection = document.createElement('div')
            let question = document.createElement('span')
            let answerSection = document.createElement('div')
            let answer = document.createElement('span')
            let delBtn = document.createElement('span')
            question.innerHTML = Object.entries(snapshot.val())[i][1].Question
            questionSection.append(question)
            if(Object.entries(snapshot.val())[i][1].Answer != ''){
                answer.innerHTML = Object.entries(snapshot.val())[i][1].Answer
                delBtn.innerHTML = '&#9940;'
                answerSection.append(answer,delBtn)
            }
            listElement.append(questionSection,answerSection)
            if(i%2 != 0) listElement.style.backgroundColor = 'yellow'
            cart_items.append(listElement)
        }
    })
})

document.getElementById('hideBtn').addEventListener('click', function(){
    document.querySelector('.container').style.display = 'none'
    document.querySelector('.hideContainer').style.display = 'none'
})