var Form = document.querySelector('#form-validation');
var UsernameInput = document.querySelector('#val_username');
var Email = document.querySelector('#val_email');
var Password = document.querySelector('#val_password');
var ConfirmPassword = document.querySelector('#val_confirm_password');

var inputGroup = document.querySelector('.input-group');

var PasswordFieldParent = document.querySelector('#val_password').parentElement;

// Handle form
Form.addEventListener('submit', function(event){
    //prevent default behaviour
    event.preventDefault();
    if (validateUsername() && validateEmail() && validatePassword() && validateConfirmPassword){
        const name = UsernameInput.value;
        const container = document.querySelector('#page-content');
        const loader = document.createElement('div');
        loader.className = 'text-center';
        const loadingBar = document.createElement('div');
        loadingBar.className = 'fa fa-spinner fa-spin fa-4x';
        loader.appendChild(loadingBar);
        container.appendChild(loader);

        setTimeout(function(){
            const loaderDiv = document.querySelector('.text-center');
            const panel = document.createElement('div');
            panel.className = 'widget-simple';
            const text = document.createElement('h3');
            text.className = 'widget-content text-right animation-pullDown';
            text.appendChild(
                document.createTextNode(
                    `Sign up successful, welcome ${name}`
                )
            );
            panel.appendChild(text);
            container.replaceChild(panel, loaderDiv);
        }, 1000);
    }
});

function validateUsername(){
    //check if is empty
    if (checkIfEmpty(UsernameInput)) return;
    // is if it has only letters
    if(!checkIfOnlyLetters(UsernameInput)) return;
    return true;
}

// validate email format
function validateEmail () {
    mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //check if is empty
    if (checkIfEmpty(Email)) return;
    
    if (!checkMailMatchFormat(Email, mailformat)) return;
    return true;
}

// validate password
function validatePassword(){
    // check if empty
    if (checkIfEmpty(Password)) return;
    // password must be in certain length
    if(!meetLength(Password, 1, 100)) return;
    // check password against our chacracter set
    // 1- a
    // 2- a 1
    // 3- A a 1
    // 4- A a 1 @
    if (!containsCharacters(Password, 1)) return;
    return true;
}

function validateConfirmPassword() {
    if(PasswordFieldParent.className !== 'input-group has-success'){
        setInvalid(ConfirmPassword, 'Password must be valid');
        return;
    }
    // if they match
    if(Password.value !== ConfirmPassword.value){
        setInvalid(ConfirmPassword, 'Password must match');
    } else {
        setValid(ConfirmPassword);

    }
    return true;
}

// check if empty field
function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
        setInvalid(field, `${field.name} must not be empty`) ;
        return true;
    } else {
        setValid(field);
        return false;
    }
}

function setInvalid(field, message) {
    //field.className = 'help-block has-error';
    field.parentElement.nextElementSibling.innerHTML = message;
    field.parentElement.className = 'input-group has-error';
    field.parentElement.nextElementSibling.className = 'help-block'
    
}

function setValid(field) {
    //field.className = 'has-success';
    field.parentElement.nextElementSibling.innerHTML = '';
    field.parentElement.className = 'input-group has-success';
    field.parentElement.nextElementSibling.className = 'help-block';
}

function checkIfOnlyLetters(field) {
    if(/^[a-zA-Z ]+$/.test(field.value)){
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only letters`);
        return false;
    }
}

// isEmpty function
function isEmpty(value) {
    if (value === '') {
        return true;
    } else {
        return false;
    }
}

function checkMailMatchFormat(field, mailformat) {
    
    if (field.value.match(mailformat)){
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must match email format`);
        return false;
    }
}

function meetLength(field, minLength, maxLength) {
    if (field.value.length >= minLength && field.value.length < maxLength) {
        setValid(field);
        return true;
    } else if (field.value.length < minLength) {
        setInvalid(field, `${field.name} must be at least ${minLength} characters long`);
        return false;
    } else {
        setInvalid(field, `${field.name} must be shorter than ${maxLength} characters long`);
        return false
    }
}

function containsCharacters(field, code) {
    let regEx;
    switch (code) {
        case 1:
            // letters
            regEx = /(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, 'Must contain at least one letter');
        case 2:
            regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, 'Must contain at least one number');
        case 3:
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return matchWithRegEx(regEx, field, 'Must contain at least one UpperCase, LowerCase, and Number');
        case 4:
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
            return matchWithRegEx(regEx, field, 'Must contain at least one UpperCase, LowerCase, Number, and Special Character');
        default:
            return false;
    }

}

function matchWithRegEx(regEx, field, message) {
    if (field.value.match(regEx)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}