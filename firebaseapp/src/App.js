import './App.css';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase , ref , push , onValue , remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

   push(shoppingListInDB, inputValue)
   
   clearInputFieldEl()
   
})

onValue(shoppingListInDB , function(snapshot){

    if(snapshot.exists()){
        
        let itemsArray = Object.entries(snapshot.val()) 
        
        //object.values --> it will get the values and convert it into array
        //object.entries is used to get both keys and values from database
    
        clearShoppingList()
    
        for (let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            
            addItemToShoppingList(currentItem)
        }
    } else {
        itemList.innerHTML = "No item in the shopping List..."
    }
})

function clearShoppingList(){
    itemList.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function addItemToShoppingList(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li") 
    
    // newEl -->  (bunch of <li>'s)

    newEl.textContent = itemValue

   newEl.addEventListener("click" , function(){
        let exactLocationOfItemInDB = ref(database , `ShoppingList/${itemID}`)

        remove(exactLocationOfItemInDB)
    })

    itemList.append(newEl)
}












function App() {}
export default App;
