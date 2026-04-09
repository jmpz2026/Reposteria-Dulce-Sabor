const btnSubmit = document.querySelector('.btnSubmit');
registerDataBase()

function registerDataBase(){
    if (localStorage.getItem("adminUser")) return;
    if (localStorage.getItem("adminPassword")) return;

    localStorage.setItem("adminUser", "admin");
    localStorage.setItem("adminPassword", "admin");
}

function login(event){
    event.preventDefault();
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    if (!(username === localStorage.getItem("adminUser"))) {
        alert('Usuario incorrecto');
        return;
    }
    if (!(password === localStorage.getItem("adminPassword"))) {
        alert('Contraseña incorrecto');
        return;
    }

    window.location.href = 'main-page.html';
}

btnSubmit.addEventListener("click", login);