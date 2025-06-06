if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else
{
    ready();
}

function ready(){
    
    //console.log("hello world");
    var removeCartItemButtons = document.getElementsByClassName('btn-quantity-remove');
    console.log(removeCartItemButtons);
    for(var i = 0; i < removeCartItemButtons.length; ++i){
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInput = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < quantityInput.length; i++){
        var input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for(var i = 0; i < addToCartButtons.length; ++i){
        var button = addToCartButtons[i];
        button.addEventListener('click',addToCartClickEvent);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
    aMethod();
}

function purchaseClicked(event){
    //validation
    var total = parseFloat(document.getElementsByClassName("cart-total-price")[0].innerText.replace('€',''));
    if(total == 0)
        alert('The shopping cart is empty.');
    else
    {
        alert('Thank you for your purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes())
        cartItems.removeChild(cartItems.firstChild);
    updateCartTotal();
    }
    
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    console.log('item removed');
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) ||input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClickEvent(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    console.log(shopItem);
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log("debug: "+title+", "+price+", "+imageSrc+"\n");
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
    
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for(var i = 0; i < cartItemNames.length; ++i){
        if(cartItemNames[i].innerText == title){
            alert('This item already exists in the cart.');
            return;
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" alt="" width="64" height="64">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="2">
        <button class="btn btn-quantity-remove" role="button">Remove From Cart</button>
    </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-quantity-remove')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for(var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        console.log(priceElement, quantityElement);
        var price = parseFloat(priceElement.innerText.replace('€', ''));
        var quantity = quantityElement.value;
        console.log(price * quantity);
        total = total + (price*quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '€'+total;
}