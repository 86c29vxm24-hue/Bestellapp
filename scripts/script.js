let contentRef;
let basketRef;
let menuRef;
let basketDesktopRef;
let basketMobileRef;
let basketDialog;

const myDishs = [
    {"name" : "Etli Ekmek",
        "price" : 9.90,
        "description" : "Dünner, länglicher Teigfladen, belegt mit fein gehacktem Rindfleisch, Gewürzen und Gemüse. Zubereitet im traditionellem Steinofen für den ganz besonderen knusprigen und rustikalen Geschmack ",
    },
    {
        "name" : "Mevlana",
        "price" : 10.90,
        "description" : "Dünner, länglicher Teigfladen belegt mit gehacktem Rindfleisch und Käse. Zubereitet im traditionellem Steinofen für den ganz besonderen knusprigen und rustikalen Geschmack"
    }, 
    {
        "name" : "Bicak Arasi",
        "price" : 11.90,
        "description" : "Dünner, länglicher Teigfladen belegt mir sehr fein geschnittenem Rindfleisch, Gewürzen und Gemüse. Zubereitet im tradittionllem Steinofen für den ganz besonderen knusprigen und rustikalen Geschmack",
    },
    {
        "name" : "Tirrit",
        "price" : 13.90,
        "description" : "Ein Gericht bei dem klein geschnittenes Fladenbrot mit zartem Fleisch vereint, welches mit kräftiger Fleischbrühe und Tomatensoße übergossen wird",
    },
    {
        "name" : "Firin Kebabi",
        "price" : 19.90,
        "description" : "Zart geschmortes Lammfleisch aus dem traditionellen Steinofen welches mit frischen gemüse und selbst gemachten Fladenbrot serviert wird",
    },
];

let cart = [];

function init () {
    contentRef = document.getElementById('content');
    basketRef = document.getElementById('basket');
    menuRef = document.getElementById('menu');
    basketDesktopRef = document.getElementById('basket'); 
    basketMobileRef = document.getElementById('basket-mobile');
    basketDialog = document.getElementById('basketDialog');

    loadCart();
    renderDishs();
};

function renderDishs () {
    contentRef.innerHTML = "";

    for (let i = 0; i < myDishs.length; i++) {
        let dish = myDishs[i];
        contentRef.innerHTML += getDishTemplate(i);
    }
}

function addToCart(i) {
    let cartEntry = cart.find(entry => entry.index === i);

    if (cartEntry) {
        cartEntry.amount++;
    } else {
        cart.push({
            index: i,
            amount: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function renderCart() {
  buildBasketHtml();

  let itemsRef = basketRef.querySelector('#basket-items');
  let totalRef = basketRef.querySelector('#basket-total');
  let orderButton = basketRef.querySelector('#order-button');
  let clearButton = basketRef.querySelector('#clear-button');

  if (cart.length === 0) {
    renderEmptyCart(itemsRef, totalRef, orderButton, clearButton);
  } else {
    renderFilledCart(itemsRef, totalRef, orderButton, clearButton);
  }
}

function loadCart() {
    let cartJSON = localStorage.getItem("cart");

    if (cartJSON) {
        cart = JSON.parse(cartJSON);
    }

    renderCart();
}

function buildBasketHtml() {
  basketRef.innerHTML = `
    <h2 class="basket-header">Warenkorb</h2>
    <div id="basket-items"></div>
    <div class="basket-total-row">
      <span>Gesamt:</span>
      <span id="basket-total"></span>
    </div>
    <button id="order-button" class="order-btn" onclick="bestellungAbsenden()">Bestellen</button>
    <button id="clear-button" class="clear-btn" onclick="warenkorbLeeren()">Alles löschen</button>
  `;
}

function renderEmptyCart(itemsRef, totalRef, orderButton, clearButton) {
  itemsRef.innerHTML = "<p>Der Warenkorb ist leer</p>";
  totalRef.textContent = "0,00 €";
  orderButton.style.display = "none";
  clearButton.style.display = "none";
}


function renderFilledCart(itemsRef, totalRef, orderButton, clearButton) {
  let total = 0;
  itemsRef.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    let cartEntry = cart[i];
    let dish = myDishs[cartEntry.index];
    let itemTotal = dish.price * cartEntry.amount;

    total += itemTotal;
    itemsRef.innerHTML += getCartItemTemplate(i);
  }

  totalRef.textContent = total.toFixed(2) + " €";
  orderButton.style.display = "block";
  clearButton.style.display = "block";
}


function bestellungAbsenden() {
    if (cart.length === 0) {
        return;
    }

    alert("Vielen Dank für deine Bestellung!");

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function warenkorbLeeren() {
    if (cart.length === 0) {
        return;
    }

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}


function openBasketDialog() {
    basketRef = basketMobileRef;
    renderCart();               
    basketDialog.showModal();
}

function closeBasketDialog() {
    basketDialog.close();
    basketRef = basketDesktopRef;
    renderCart();          
}

function changeAmount(cartIndex, delta) {
    cart[cartIndex].amount += delta;

    if (cart[cartIndex].amount <= 0) {
        cart.splice(cartIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
