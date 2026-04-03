const btnSubmit = document.querySelector('.btnSubmit');

function registerTransaction(event){
    event.preventDefault();
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
        paymentOption
    );

    let bills = JSON.parse(localStorage.getItem('bills')) || [];
    bills.push(bill);
    localStorage.setItem('bills', JSON.stringify(bills));

    console.log(bill);
    console.log(bills);
}

btnSubmit.addEventListener('click', registerTransaction);