const btnSubmit = document.querySelector('.btnSubmit');
const readyBtn = document.querySelector('.readyBtn');

function registerTransaction(event){
    event.preventDefault();

    const productData = localStorage.getItem('productoParaPagar');
    if(!productData){
        alert("Producto invalido");
        return;
    }

    const product = JSON.parse(productData);
    if(!product.nombre){
        alert("Producto no contiene nombre");
        return;
    }
    if(!product.precio || Number.isNaN(Number(product.precio))){
        alert("Producto no contiene precio o es invalido");
        return;
    }

    let productName = product.nombre;
    let priceBase = Number(product.precio);
    let priceDelivery = 2000;
    let priceTotal = priceBase + priceDelivery;

    let name = document.querySelector('#name').value;
    if (!name || name === '' || name === null) {
        alert('Por favor ingresa un nombre valido');
        return;
    }

    let address = document.querySelector('#address').value;
    if (!address || address === '' || address === null) {
        alert('Por favor ingresa una direccion valida');
        return;
    }

    let phone = document.querySelector('#phone').value;
    if (!phone || phone === '' || phone === null) {
        alert('Por favor ingresa un numero valido');
        return;
    }

    let email = document.querySelector('#email').value;
    if (!email || email === '' || email === null) {
        alert('Por favor ingresa un email valido');
        return;
    }

    let paymentOption = document.querySelector('#paymentOption').value;
    if (!paymentOption || paymentOption === '' || paymentOption === null) {
        alert('Por favor ingresa una opcion de pago valida');
        return;
    }

    let bill = new Bill(
        name,
        address,
        phone,
        email,
        paymentOption,
        productName,
        priceBase,
        priceDelivery,
        priceTotal
    );

    let bills = JSON.parse(localStorage.getItem('bills')) || [];
    bills.push(bill);
    localStorage.setItem('bills', JSON.stringify(bills));

    console.log(bill);
    console.log(bills);
    showWindowBill(bill)
}

function showWindowBill(bill){
    let popUp = document.querySelector('.popup-box');
    popUp.querySelector('.popup-name').textContent = bill.productName;
    popUp.querySelector('.popup-price-base').textContent = bill.priceBase + '$';
    popUp.querySelector('.popup-price-delivery').textContent = bill.priceDelivery + '$';
    popUp.querySelector('.popup-price-total').textContent = bill.priceTotal + '$';

    document.querySelector('.popup').style.display = 'flex';
    document.querySelector('.popup').classList.add('active');
}

function hideWindowBill(){
    document.querySelector('.popup').classList.remove('active');
}

btnSubmit.addEventListener('click', registerTransaction);

readyBtn.addEventListener('click', hideWindowBill);