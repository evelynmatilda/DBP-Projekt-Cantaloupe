"use strict";

function deleteAccout () {
    let delAccountBtn = document.querySelector("#del-account-button");
    let confirmDelete = document.querySelector(".confirmDelete-closed");

    delAccountBtn.addEventListener("click", function(){
        if(confirmDelete.className == "confirmDelete-closed"){
            confirmDelete.className = "confirmDelete-opened";
        } else {
            confirmDelete.className = "confirmDelete-closed";
        }
    });

    let yesDelete = document.querySelector("#yes-delete");
    let noDelete = document.querySelector("#no-delete");

    noDelete.addEventListener("click", function(){
        confirmDelete.className = "confirmDelete-closed";
    });

    yesDelete.addEventListener("click", eventDeleteAccount);

}

function eventDeleteAccount (){
    let id = window.localStorage.getItem("userId");
    console.log(id)
    
    const deleteRequest = new Request("/PHP-filer/userDelete.php", {

        method: 'DELETE',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            userId: parseInt(id)
        }),
    });

    fetch(deleteRequest)
        .then(r => r.json())
        .then(resource => {
            console.log(resource)
            localStorage.clear();
            window.location.href = "/HTML-filer/homePage.html";
        });
}

deleteAccout()