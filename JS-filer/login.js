"use strict";

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
        .then(resource => {
            if (resource.email == email && resource.username == username && resource.password == password) {
                window.localStorage.setItem("userId", resource.userId);
                window.location.href = "/HTML-filer/homePage.html";
            }
        })

}

document.querySelector(".login-button").addEventListener("click", logIn);
function logIn(event){
    event.preventDefault();
    let recUsername = document.querySelector("#login-username").value;
    let recPassword = document.querySelector("#login-password").value;
    let errorMessage = document.getElementById("error-message");
    let input = document.querySelector("#input-login-visible");
    errorMessage.innerHTML = "";
    input.classList.remove("shake");

    fetch("/PHP-filer/userRead.php")
        .then(r => r.json())
        .then(resource => {
            resource.forEach(user => {
                if (recUsername == user.username && recPassword == user.password) {

                    window.localStorage.setItem("userId", user.userId)
                    window.localStorage.setItem("userId", user.userId);
                    window.location.href = "/HTML-filer/homePage.html";
                    errorMessage.innerHTML = "";
                }
                else {
                    errorMessage.innerHTML = "Fel användarnamn eller lösenord...";
                    errorMessage.style.color = "red";
                    errorMessage.style.display = "flex";
                    input.classList.add("shake");
                }
            })
        })
}

let regButton = document.querySelector(".reg-button");

regButton.addEventListener("click", regUser);

function regUser(event){
    event.preventDefault();

    let regEmail = document.querySelector("#reg-email").value;
    let regUsername = document.querySelector("#reg-username").value;
    let regPassword = document.querySelector("#reg-password").value;

    addUser(regEmail, regUsername, regPassword)
};

