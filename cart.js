const cartItems = [
        // { id: 1, title: 'Апельсин', description: 'цитрус', price: 15, quantity: 3, img: 'orange.jpg' },
        // { id: 2, title: 'Кола', description: 'Напиток газ', price: 60, quantity: 2, img: 'cola.jpg' }
    ];

    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const checkoutBtn = document.getElementById('checkout-btn');

    function renderCart() {
        cartItemsContainer.innerHTML = `<template id="cart-item-template">
                    <div class="cart-item">
                        <button class="remove-btn">✕</button>
                        <img src="" alt="" class="cart-item-img" onerror="this.src='../images/notfound.png'">
                        <div class="cart-item-details">
                            <h3 class="cart-item-title"></h3>
                            <p class="cart-item-description"></p>
                            <p class="cart-item-price-per-unit"></p>
                        </div>
                        <div class="cart-item-quantity-controls">
                            <button class="q-btn minus">-</button>
                            <span class="q-display">0</span>
                            <button class="q-btn plus">+</button>
                        </div>
                        <p class="cart-item-total-price"></p>
                    </div>
                </template>`;

        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartSubtotal.textContent = '[Подытог цен]';
            checkoutBtn.textContent = '[Оформить заказ]';
            checkoutBtn.style.display = 'inline-block';
            checkoutBtn.style.background = 'none';
            checkoutBtn.style.border = 'none';
            checkoutBtn.style.color = 'inherit';
            checkoutBtn.style.cursor = 'default';
        } else {
            emptyCartMessage.style.display = 'none';

            let totalSum = 0;

            cartItems.forEach(item => {
                const t = document.getElementById('cart-item-template');
                const template = t.content.cloneNode(true);

                template.querySelector('.remove-btn').addEventListener('click', () => removeItem(item.id));
                template.querySelector('.minus').addEventListener('click', () => changeQuantity(item.id, -1));
                template.querySelector('.plus').addEventListener('click', () => changeQuantity(item.id, 1));

                template.querySelector('.cart-item-img').src = item.img;
                template.querySelector('.cart-item-img').alt = item.title;
                template.querySelector('.cart-item-title').textContent = item.title;
                template.querySelector('.cart-item-description').textContent = item.description;

                const pricePerUnitText = `цена за шт: ${item.price} ₽`;
                template.querySelector('.cart-item-price-per-unit').textContent = pricePerUnitText;

                template.querySelector('.q-display').textContent = item.quantity;

                const itemTotal = item.price * item.quantity;
                totalSum += itemTotal;

                template.querySelector('.cart-item-total-price').textContent = `${itemTotal} ₽`;

                cartItemsContainer.appendChild(template);
            });

            cartSubtotal.textContent = `[${totalSum} ₽]`;
            
            checkoutBtn.textContent = '[Оформить заказ]';
            checkoutBtn.style.display = 'inline-block';
            
            checkoutBtn.style.background = '#f0ebe4';
            checkoutBtn.style.border = '1px solid #ccc';
            checkoutBtn.style.padding = '12px 40px';
            checkoutBtn.style.borderRadius = '60px';
            checkoutBtn.style.fontSize = '1rem';
            checkoutBtn.style.fontWeight = '500';
            checkoutBtn.style.cursor = 'pointer';
            
            checkoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'checkout.html';
            });
        }
    }

    function removeItem(id) {
        const index = cartItems.findIndex(i => i.id === id);
        if (index > -1) {
            cartItems.splice(index, 1);
        }
        renderCart();
    }

    function changeQuantity(id, delta) {
        const item = cartItems.find(i => i.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                removeItem(id);
            } else {
                renderCart();
            }
        }
    }

    function addItem(newItem) {
        const existingItemIndex = cartItems.findIndex(item => item.id === newItem.id);
        if (existingItemIndex > -1) {
            console.log(`Увеличиваем количество на ${newItem.quantity}.`);
            cartItems[existingItemIndex].quantity += newItem.quantity;
        } else {
            console.log(`Добавляем новый товар с ID ${newItem.id}.`);
            cartItems.push({ ...newItem });
        }
        renderCart();
    }
    document.addEventListener('DOMContentLoaded', renderCart);