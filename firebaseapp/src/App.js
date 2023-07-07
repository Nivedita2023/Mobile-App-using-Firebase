import './App.css';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase , ref , push , onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-2dcfd-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "ShoppingList")

const inputFieldEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-btn")
const itemList = document.getElementById("item-list")

addBtn.addEventListener("click", function() {
   let inputValue = inputFieldEl.value

   clearInputFieldEl()
   
   push(shoppingListInDB, inputValue)
   
})

onValue(shoppingListInDB , function(snapshot){
    let itemsArray = Object.values(snapshot.val()) //converting data object in array

    clearShoppingList()

    for (let i = 0; i < itemsArray.length; i++){
        addItemToShoppingList(itemsArray[i])
    }
})

function clearShoppingList(){
    itemList.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function addItemToShoppingList(itemValue){

    itemList.innerHTML += `<li>${itemValue}</li>`
}












function App() {}
export default App;
