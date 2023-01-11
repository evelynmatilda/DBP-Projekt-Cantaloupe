function logOut(){
    let logOutButton = document.querySelector("#logOutButton");
    let confirmLogOut = document.querySelector(".confirmLogOut-closed");
    logOutButton.addEventListener("click", function(){
        if(confirmLogOut.className == "confirmLogOut-closed"){
            confirmLogOut.className = "confirmLogOut-opened";
        } else {
            confirmLogOut.className = "confirmLogOut-closed";
        }
    });
    let yesLogOut = document.querySelector("#yesLogOut");
    let noLogOut = document.querySelector("#noLogOut");

    yesLogOut.addEventListener("click", function(){
        window.localStorage.clear();
        window.location.href = "../index.html";
    });

    noLogOut.addEventListener("click", function(){
       confirmLogOut.className = "confirmLogOut-closed"
    });

}

logOut()