"use strict";

function deleteAccout() {
    let delAccountBtn = document.querySelector("#del-account-button");
    let confirmDelete = document.querySelector(".confirmDelete-closed");

    delAccountBtn.addEventListener("click", function () {
        if (confirmDelete.className == "confirmDelete-closed") {
            confirmDelete.className = "confirmDelete-opened";
        } else {
            confirmDelete.className = "confirmDelete-closed";
        }
    });

    let yesDelete = document.querySelector("#yes-delete");
    let noDelete = document.querySelector("#no-delete");

    noDelete.addEventListener("click", function () {
        confirmDelete.className = "confirmDelete-closed";
    });

    yesDelete.addEventListener("click", getUsersPlants);

}

function getUsersPlants() {
    let id = window.localStorage.getItem("userId");
    const userrqst = new Request(`../PHP-filer/userRead.php?userId=${id}`);

    fetch(userrqst)
        .then(r => r.json())
        .then(resource => {
            let plants = resource.owns.length;
            eventDeleteUserplants(plants)
        });
    
}

function eventDeleteUserplants(plants) {
    let id = window.localStorage.getItem("userId");
    const requests = [];

    const plantrqst = new Request(`../PHP-filer/userPlantRead.php`)

    fetch(plantrqst)
        .then(r => r.json())
        .then(userPlants => {
            userPlants.forEach(userPlant => {
                if (userPlant.userId == id) {
                    let userPlantId = userPlant.userPlantId;
                    const deleteUserPlant = new Request("../PHP-filer/userPlantDelete.php", {
                        method: 'DELETE',
                        headers: { "Content-type": "application/json; charset=UTF-8" },
                        body: JSON.stringify({
                            userPlantId: userPlantId
                        }),
                    });

                    requests.push(deleteUserPlant);
                    if(requests.length == plants){
                        const allPromises = requests.map(promise => fetch(promise));
                        Promise.all(allPromises)
                            .then(responses => Promise.all(responses.map(r => r.json())))
                            .then(deleteUserAccount)
                    }
                }

            });
        });

}

function deleteUserAccount() {
    let id = window.localStorage.getItem("userId");

    const deleteRequest = new Request("../PHP-filer/userDelete.php", {

        method: 'DELETE',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            userId: parseInt(id)
        }),
    });

    fetch(deleteRequest)
        .then(r => r.json())
        .then(resource => {
            console.log(resource);
            localStorage.clear();
            window.location.href = "HTML-filer/homePage.html";
        });
}



deleteAccout()