function getDishTemplate(dish, index) {
    return `
    <article class="dish-card">
        <h3>${dish.name} - ${dish.price.toFixed(2)} €</h3>
        <p>${dish.description}</p>
        <button onclick="addToCart(${index})">+</button>
    </article>`;
}

function getCartItemTemplate(cartItem, cartIndex) {
    return `
    <article class="cart-item">
        <div class="cart-item-main">
            <span class="cart-item-name">${cartItem.name}</span>
            <span class="cart-item-price">${cartItem.subTotal.toFixed(2)} €</span>
        </div>
        <div class="cart-item-controls">
            <button onclick="changeAmount(${cartIndex}, -1)">-</button>
            <span>${cartItem.amount}</span>
            <button onclick="changeAmount(${cartIndex}, 1)">+</button>
        </div>
        <button class="cart-item-delete" onclick="removeFromCart(${cartIndex})">Löschen</button>
    </article>`;
}
