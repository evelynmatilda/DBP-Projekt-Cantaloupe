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