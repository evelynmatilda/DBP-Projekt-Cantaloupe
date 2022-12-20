"use strict";

let nav = document.querySelector(".nav-container-closed");
let line = document.querySelector(".menu-closed")
let text = document.querySelector(".text-container-hidden")
let profileSymbol = document.querySelector("#profile-symbol-visible");
let menuSymbol = document.querySelector(".menu-closed > .material-symbols-outlined");
let closeX = document.querySelector("#close-hidden");
let inputReg = document.querySelector("#reg-login-hidden");
line.style.cursor = "pointer";
line.addEventListener("click", function(){
    if (nav.className == "nav-container-closed"){
    nav.className = "nav-container-opened";
    profileSymbol.id = "profile-symbol-hidden";
}
    else {
    nav.className = "nav-container-closed";
    profileSymbol.id = "profile-symbol-visible";
}

if (line.className == "menu-closed"){
    line.className = "menu-opened";
}
    else {
    line.className = "menu-closed";
}

if (text.className == "text-container-visible"){
    text.className = "text-container-hidden";
}
    else {
    text.className = "text-container-visible";
}
});

let profile = document.querySelector(".profile-closed");
let inputLogin = document.querySelector("#input-login-hidden");
let profileContainer = document.querySelector(".profile-container-hidden")
profile.style.cursor = "pointer";
profile.addEventListener("click", profileEvent)

function profileEvent(){
    if (nav.className == "nav-container-closed"){
        nav.className = "nav-container-opened";
        menuSymbol.id = "line-menu-hidden";
    }
        else {
        nav.className = "nav-container-closed";
        menuSymbol.id = "line-menu-visible";
    }
    
    if (profile.className == "profile-closed"){
        profile.className = "profile-opened";
    }
        else {
        profile.className = "profile-closed";
    }
    
    if (profileContainer.className == "profile-container-visible"){
        profileContainer.className = "profile-container-hidden";
    }
        else {
        profileContainer.className = "profile-container-visible";
    }
    
    if (closeX.id == "close-hidden"){
        closeX.id = "close-visible";
    }   
        else {
        closeX.id = "close-hidden";
    }
    
    if (profileSymbol.id == "profile-symbol-visible"){
        profileSymbol.id = "profile-symbol-hidden";
    }
        else {
        profileSymbol.id = "profile-symbol-visible";    
    }
    
    if(inputLogin.id == "input-login-hidden"){
        inputLogin.id = "input-login-visible";
    }
        else {
            inputLogin.id = "input-login-hidden";
    }  
    
    if (nav.className == "nav-container-closed"){
        inputLogin.id = "input-login-hidden";
        inputReg.id = "reg-login-hidden";
        document.getElementById("error-message").innerHTML="";
    } 
        else {
            inputLogin.id = "input-login-visible";
            loginInputs.style.borderBottom = "solid black 2px"
            regInputs.style.borderBottom = "solid black 1px"
    }
}


let loginInputs = document.querySelector(".text-login");
let regInputs = document.querySelector(".text-reg");

loginInputs.addEventListener("click", function(){
    if(inputLogin.id == "input-login-hidden"){
        inputLogin.id = "input-login-visible";
        loginInputs.style.borderBottom = "solid black 2px"
        regInputs.style.borderBottom = "solid black 1px"
    }
        else {
            inputLogin.id = "input-login-hidden";
    }
    
    if (inputReg.id == "reg-login-visible"){
        inputReg.id = "reg-login-hidden";
    }
    
});

regInputs.addEventListener("click", function(){
    document.getElementById("error-message").innerHTML = "";
    if(inputReg.id == "reg-login-hidden"){
        inputReg.id = "reg-login-visible";
        regInputs.style.borderBottom = "solid black 2px"
        loginInputs.style.borderBottom = "solid black 1px"
    }
        else {
            inputReg.id = "reg-login-hidden"
    }

    if (inputLogin.id == "input-login-visible"){
        inputLogin.id = "input-login-hidden";
    }   
});


if (localStorage.length > 0) {
    profileContainer.style.display = "none";
    inputLogin.style.display = "none";
    profile.removeEventListener("click", profileEvent)
    profile.addEventListener("click", function(){
        window.location.href = "/HTML-filer/userProfile.html";
    })
} 