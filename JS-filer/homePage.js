"use strict";

let registerButton = document.querySelector("#register-button");

registerButton.addEventListener("click", reg)

function reg(event){
    event.preventDefault();

    let email = document.querySelector("#email").value;
    let userName = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    addUser(email, userName, password)

};


function addUser(email, username, password){
    
    const request = new Request("/PHP-filer/userCreate.php",{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        }),
    });

    fetch(request)
        .then(r => r.json())
        .then(console.log)

}