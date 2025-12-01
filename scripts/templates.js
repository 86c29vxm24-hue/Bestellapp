function getDishTemplate(i) {
    let dish = myDishs[i];

    return `
    <article class="dish-card">
        <h3>${dish.name} - ${dish.price.toFixed(2)} €</h3>
        <p>${dish.description}</p>
        <button onclick="addToCart(${i})">+</button>
    </article>`;
}

function getCartItemTemplate(cartIndex) {
    let entry = cart[cartIndex];
    let dish = myDishs[entry.index];
    let subTotal = dish.price * entry.amount;

    return `
    <article class="cart-item">
        <div class="cart-item-main">
            <span class="cart-item-name">${dish.name}</span>
            <span class="cart-item-price">${subTotal.toFixed(2)} €</span>
        </div>
        <div class="cart-item-controls">
            <button onclick="changeAmount(${cartIndex}, -1)">-</button>
            <span>${entry.amount}</span>
            <button onclick="changeAmount(${cartIndex}, 1)">+</button>
        </div>
    </article>`;
}
