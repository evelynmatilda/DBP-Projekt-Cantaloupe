"use strict";

let registerButton = document.querySelector("#register-button");

registerButton.addEventListener("click", reg)

function reg(event){
    event.preventDefault();

    let email = document.querySelector("#email").value;
    let userName = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    addUser(email, userName, password)

    document.querySelector("#email").value = "";
    document.querySelector("#username").value = "";
    document.querySelector("#password").value = "";

};


function regUser(email, userName, password){
    
    const request = new Request("/PHP-filer/userCreate.php",{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            username: userName,
            password: password
        }),
    });

    fetch(request)
        .then(r => r.json())
        .then(resource => {
            if (resource.email == email && resource.username == userName && resource.password == password) {
                window.localStorage.setItem("userId", resource.userId);
                window.location.href = "/HTML-filer/homePage.html";
            }
        })

}

let userId = window.localStorage.getItem("userId");

homePageLogedIn(userId)

function homePageLogedIn(userId) {
    if (localStorage.length > 0){
        let homePageReg = document.getElementById("registration");
        let homePageText = document.querySelector("#welcomeText > p");
        let welcomeText = document.querySelector("#welcome");

        homePageText.innerHTML = "";
        homePageReg.style.display = "none";

        const rqst = new Request (`/PHP-filer/userRead.php?userId=${userId}`);

        fetch(rqst)
            .then(r => r.json())
            .then(user => {
                welcomeText.innerHTML = `<h1>Välkommen "${user.username}"!</h1>`;
                logedInHome()
            })
    }
}

function logedInHome () {
    let wrapper = document.getElementById("logedIn-wrapper");
    wrapper.style.height = "50vh";
    wrapper.style.width = "100vw";
    wrapper.innerHTML = `<a href="/HTML-filer/plantInfo.html"><h1 class="logedIn-button">Våra Växter</h1></a>
    <a href="userProfile.html"><h1 class="logedIn-button">Min Profil</h1></a>
    <a href="userPlants.html"><h1 class="logedIn-button">Mina växter</h1></a>
    <a href="/HTML-filer/aboutUs.html"><h1 class="logedIn-button">Om oss</h1></a>
    `;
}