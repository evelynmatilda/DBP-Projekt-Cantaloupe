"use strict";

function getProfileInfo () {
    let id = window.localStorage.getItem("userId");

    const rqst = new Request (`/PHP-filer/userRead.php?userId=${id}`);

        fetch(rqst)
            .then(r => r.json())
            .then(user => {
                for (let i = 0; i < user.password.length; i++){
                    let p = document.createElement("p");
                    document.getElementById("pass-word").append(p);
                    p.innerHTML = "*";
                    p.style.margin = "0";
                }
                document.getElementById("user-name").innerHTML = `Användarnamn: ${user.username}`;
                document.getElementById("e-mail").innerHTML = `Email: ${user.email}`;

            })

}
getProfileInfo ()

function openForm (){
   let editNameButton = document.getElementById("name-edit-button");
   editNameButton.style.cursor = "pointer";
   editNameButton.addEventListener("click", eventEditUsername);

   function eventEditUsername () {
    let nameDiv = document.getElementById("user-name");
    nameDiv.innerHTML = `<input id="edit-name" type="text" placeholder="Nytt användarnamn"></input>
    <button class="save">Spara</button></div>`;

    nameDiv.querySelector(".save").addEventListener("click", function(){
        const newUsername = document.querySelector('input[id="edit-name"]').value;
        patchUsername(newUsername)
    });
   }

   let editPassButton = document.getElementById("password-edit-button");
   editPassButton.style.cursor = "pointer";
   editPassButton.addEventListener("click", eventEditPassword);

   function eventEditPassword () {
    let passDiv = document.getElementById("pass-word");
    passDiv.innerHTML = `<input id="edit-pass" type="text" placeholder="Nytt lösenord"></input>
    <button class="save">Spara</button></div>`;

    passDiv.querySelector(".save").addEventListener("click", function(){
        const newPassword = document.querySelector('input[id="edit-pass"]').value;
        patchPassword(newPassword)
    });
   }

   let editEmailButton = document.getElementById("email-edit-button");
   editEmailButton.style.cursor = "pointer";
   editEmailButton.addEventListener("click", eventEditEmail);

   function eventEditEmail () {
    let emailDiv = document.getElementById("e-mail");
    emailDiv.innerHTML = `<input id="edit-email" type="text" placeholder="Ny email"></input>
    <button class="save">Spara</button></div>`;

    emailDiv.querySelector(".save").addEventListener("click", function(){
        const newEmail = document.querySelector('input[id="edit-email"]').value;
        patchEmail(newEmail)
    });
   }



}

function patchUsername (newUsername) {
    let id = window.localStorage.getItem("userId");

    const patch_rqst = new Request("/PHP-filer/usernameUpdate.php", {

        method: 'PATCH',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            id: parseInt(id),
            username: newUsername
        }),
    });

    fetch(patch_rqst)
        .then(r => r.json())
        .then(recource =>{
            window.location.href = "/HTML-filer/userProfile.html";
        })
    

}

function patchPassword (newPassword) {
    let id = window.localStorage.getItem("userId");

    const patch_rqst = new Request("/PHP-filer/passwordUpdate.php", {

        method: 'PATCH',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            id: parseInt(id),
            password: newPassword
        }),
    });

    fetch(patch_rqst)
        .then(r => r.json())
        .then(recource =>{
            window.location.href = "/HTML-filer/userProfile.html";
        })
    
}

function patchEmail (newEmail) {
    let id = window.localStorage.getItem("userId");

    const patch_rqst = new Request("/PHP-filer/emailUpdate.php", {

        method: 'PATCH',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            id: parseInt(id),
            email: newEmail
        }),
    });

    fetch(patch_rqst)
        .then(r => r.json())
        .then(recource =>{
            window.location.href = "/HTML-filer/userProfile.html";
        })
    
}


openForm()