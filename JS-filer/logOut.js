function logOut(){
    let logOutButton = document.querySelector("#logOutButton");
    logOutButton.addEventListener("click", function(){
        window.localStorage.clear()
        window.location.href = "/HTML-filer/homePage.html";
    })
}

logOut()