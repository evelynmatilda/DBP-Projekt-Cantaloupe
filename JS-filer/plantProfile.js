function plantClick(){
    let plant = document.querySelector("#plant");
    plant.addEventListener("click", plantOverlay)
}

function plantOverlay(){
let overlay = document.querySelector(".plantProfileOverlay");
overlay.style.display = "block"
overlay.style.width = "100%";
overlay.style.height = "100%";
let exit = document.querySelector("#exit");
exit.addEventListener("click", function(){
    overlay.style.display = "none";
})
}

plantClick()