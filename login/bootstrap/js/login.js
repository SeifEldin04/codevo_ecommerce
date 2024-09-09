document.getElementById('myCart').addEventListener('click', function () {
    location.href = '../myCart/myCart.html';
})

document.querySelector('.mySignInBtn').addEventListener('click', () => {
    document.querySelector('.mySignUp').classList.add('d-none');
    document.querySelector('.mySignIn').classList.replace('d-none', 'd-block');
})

document.querySelector('.mySignUpBtn').addEventListener('click', () => {
    document.querySelector('.mySignIn').classList.replace('d-block', 'd-none');
    document.querySelector('.mySignUp').classList.remove('d-none');
})

function clearInputs() {
    signUpName.value = '';
    signUpEmail.value = '';
    signUpPassword.value = '';
}

let usersContainer = [];

if (localStorage.getItem('users') != null) {
    usersContainer = JSON.parse(localStorage.getItem('users'));
}
else {
    usersContainer = [];
}

// -------------- sign up -----------------

let signUpName = document.querySelector('#signUpName');
let signUpEmail = document.querySelector('#signUpEmail');
let signUpPassword = document.querySelector('#signUpPassword');


function createEmail() {
    if (signUpName.value == '' || signUpEmail.value == '' || signUpPassword.value == '') {
        document.getElementById('message1').innerHTML = `<p class = 'alert alert-danger text-center text-dark'>All inputs is required</p>`
    }
    else {
        let users = {
            name: signUpName.value,
            email: signUpEmail.value,
            password: signUpPassword.value,
            active: true
        }
        usersContainer.push(users);
        localStorage.setItem('users', JSON.stringify(usersContainer));
        location.href = '../../index.html';
        clearInputs();
    }
}

document.querySelector('#signUp').addEventListener('click', () => {
    createEmail();
})

// ------------ log-in --------------

let signInEmail = document.querySelector('#signInEmail');
let signInPassword = document.querySelector('#signInPassword');

function checkEmail() {
    if (signInEmail.value == '' || signInPassword.value == '') {
        document.getElementById('message2').innerHTML = `<p class = 'alert alert-danger text-center text-dark'>All inputs is required</p>`
    }
    else {
        for (let i = 0; i < usersContainer.length; i++) {
            if (signInEmail.value === usersContainer[i].email && signInPassword.value === usersContainer[i].password) {
                location.href = '../../index.html';
                clearInputs();
            }
            else {
                document.getElementById('message2').innerHTML = `<p class = 'alert alert-danger text-center text-dark'>The email or password isn't exist</p>`
            }
        }
    }
}

document.querySelector('#SignIn').addEventListener('click', () => {
    checkEmail();
})