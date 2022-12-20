function plantClick(){
    let plant = document.querySelector("#plant");
    plant.addEventListener("click", plantOverlay)
}

function plantOverlay(){
let overlay = document.querySelector(".plantProfileOverlay");
overlay.style.width = "100vw";
overlay.style.height = "100vh";
overlay.style.backgroundColor = "green";
}

plantClick()