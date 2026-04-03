const btnShop = document.querySelector('.homeSection');
const btnCart = document.querySelector('.cartSection');
const btnInfoUs = document.querySelector('.contactUsSection');


function goToShop(){
    window.location.href = 'main-page.html';
}

function goToCart(){
    window.location.href = 'checkout.html';
}

function goToInfoUs(){
    window.location.href = 'info-us.html';
}

btnShop.addEventListener('click', goToShop);

btnCart.addEventListener('click', goToCart);

btnInfoUs.addEventListener('click', goToInfoUs);