let loginScreen = document.getElementById('loginScreen');
let alertLogin = document.getElementById('alertLogin');
let emailLogin = document.getElementById('emailLogin');
let emailPassword = document.getElementById('passwordLogin');
let btnLogin = document.getElementById('btnLogin');
let btnJoin = document.getElementById('btnJoin');

let createAccScreen = document.getElementById('createAccScreen');
let emailCreate = document.getElementById('emailCreate');
let passwordCreate = document.getElementById('passwordCreate');
let alertCreate = document.getElementById('alertPassword');
let btnCreate = document.getElementById('btnCreate');
let goToLogin = document.getElementById('goToLogin');

let users = [];

function getData() {
    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
    } else {
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function login() {
    let logged = false;
    let isUser = false;

    users.forEach(user => {
        if (emailLogin.value == user.email) {
            isUser = true;
            if (passwordLogin.value == user.password) {
                logged = true;
            }
        }
    })

    if (isUser && logged) {
        alert('Logado com sucesso.');
        alertLogin.classList.add('d-none');
        emailLogin.value = '';
        passwordLogin.value = '';
    } else if (isUser && !logged) {
        alertLogin.classList.remove('d-none');
        alertLogin.innerHTML = 'Senha incorreta.';
    } else {
        alertLogin.classList.remove('d-none');
        alertLogin.innerHTML = 'Usuário não encontrado.';
    }
}

function createAccount() {
    if (wrongEmail(emailCreate.value)){
        alertCreate.classList.remove('d-none');
        alertCreate.textContent = 'Email mal formatado.';
    }else if(weakPassword(passwordCreate.value)) {
        alertCreate.classList.remove('d-none');
        alertCreate.textContent = 'Sua senha deve possuir 8 ou mais caracteres.';
    }else {
        let notUser = true;

        users.forEach(user => {
            if (user.email == emailCreate.value) {
                notUser = false;
            }
        })

        if (notUser) {
            users.push({
                email: emailCreate.value,
                password: passwordCreate.value
            });

            alert('Cadastrado com sucesso.');

            alertPassword.classList.add('d-none');
            emailCreate.value = '';
            passwordCreate.value = '';

            localStorage.setItem('users', JSON.stringify(users));
        }else{
            alert('Este email já foi cadastrado.');
            emailCreate.value = '';
            passwordCreate.value = '';
        }
    }
}

function wrongEmail(email){
    if(email.indexOf('@') < 1){
        return true;
    }else{
        return false;
    }
}

function weakPassword(password) {
    if (password.length < 8) {
        return true;
    } else {
        return false;
    }
}

btnLogin.addEventListener('click', login);

btnCreate.addEventListener('click', createAccount);

btnJoin.addEventListener('click', () => {
    loginScreen.classList.add('d-none');
    createAccScreen.classList.remove('d-none');
    alertLogin.classList.add('d-none');
    alertPassword.classList.add('d-none');
    emailCreate.focus();
})

goToLogin.addEventListener('click', () => {
    loginScreen.classList.remove('d-none');
    createAccScreen.classList.add('d-none');
    alertLogin.classList.add('d-none');
    alertPassword.classList.add('d-none');
    emailCreate.value = '';
    passwordCreate.value = '';
    emailLogin.focus();
})

getData();