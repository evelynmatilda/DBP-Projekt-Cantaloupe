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
    let nameDiv = document.getElementById("pass-word");
    nameDiv.innerHTML = `<input id="edit-pass" type="text" placeholder="Nytt lösenord"></input>
    <button class="save">Spara</button></div>`;
   }
   let editEmailButton = document.getElementById("email-edit-button");
   editEmailButton.style.cursor = "pointer";
   editEmailButton.addEventListener("click", eventEditEmail);

   function eventEditEmail () {
    let nameDiv = document.getElementById("e-mail");
    nameDiv.innerHTML = `<input id="edit-email" type="text" placeholder="Ny email"></input>
    <button class="save">Spara</button></div>`;
   }



}

function patchUsername (newUsername) {
    let id = window.localStorage.getItem("userId");

    const patch_rqst = new Request("/PHP-filer/userUpdate.php", {

        method: 'PATCH',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            id: parseInt(id),
            username: newUsername
        }),
    });

    fetch(patch_rqst)
        .then(r => r.json())
        .then(console.log)
    

}


openForm()