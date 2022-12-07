"use strict";

let nav = document.querySelector(".nav-container-closed");
let body = document.querySelector("body")
let line = document.querySelector(".menu-closed")
let text = document.querySelector(".text-container-hidden")
line.style.cursor = "pointer"
line.addEventListener("click", function(){
    if (nav.className == "nav-container-closed"){
    nav.className = "nav-container-opened"
}
    else {
    nav.className = "nav-container-closed";
}

if (line.className == "menu-closed"){
    line.className = "menu-opened"
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