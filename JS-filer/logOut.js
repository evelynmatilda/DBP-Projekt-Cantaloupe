function logOut(){
    let logOutButton = document.querySelector("#logOutButton");
    logOutButton.addEventListener("click", function(){
        if(window.confirm("Är du säker på att du vill logga ut? Tryck OK för ja och Avbryt för nej") == true){
             window.localStorage.clear()
            window.location.href = "/HTML-filer/homePage.html";
        } else {

        }
        
    })
}

logOut()