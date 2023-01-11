function logOut(){
    let logOutButton = document.querySelector("#logOutButton");
    let confirmLogOut = document.querySelector(".confirmLogOut-closed");
    let confirmWrapper = document.querySelector(".confirm-wrapper-closed");
    logOutButton.addEventListener("click", function(){
        if(confirmWrapper.className == "confirm-wrapper-closed"){
            confirmWrapper.className = "confirm-wrapper-opened";
        }
        else{
            confirmWrapper.className = "confirm-wrapper-closed";
        }
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
        window.location.href = "index.html";
    });

    noLogOut.addEventListener("click", function(){
        confirmWrapper.className = "confirm-wrapper-closed";
        confirmLogOut.className = "confirmLogOut-closed"
    });

}

logOut()