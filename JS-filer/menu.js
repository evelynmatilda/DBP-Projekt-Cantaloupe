"use strict";

let nav = document.querySelector(".nav-container-closed");
let line = document.querySelector(".menu-closed")
let text = document.querySelector(".text-container-hidden")
line.style.cursor = "pointer"
line.addEventListener("click", function(){
    if (nav.className == "nav-container-closed"){
    nav.className = "nav-container-opened";
}
    else {
    nav.className = "nav-container-closed";
}

if (line.className == "menu-closed"){
    line.className = "menu-opened";
}
    else {
    line.className = "menu-closed";
}

if (text.className == "text-container-visible"){
    text.className = "text-container-hidden"
}
    else {
    text.className = "text-container-visible";
}
});

let profileSymbol = document.querySelector(".profile-closed")
let profileContainer = document.querySelector(".profile-container-hidden")
profileSymbol.style.cursor = "pointer"
profileSymbol.addEventListener("click", function(){
    if (nav.className == "nav-container-closed"){
    nav.className = "nav-container-opened";
}
    else {
    nav.className = "nav-container-closed";
}

if (profileSymbol.className == "profile-closed"){
    profileSymbol.className = "profile-opened";
}
    else {
    profileSymbol.className = "profile-closed";
}

if (profileContainer.className == "profile-container-visible"){
    profileContainer.className = "profile-container-hidden";
}
    else {
    profileSymbol.className = "profile-container-visible";
}
});