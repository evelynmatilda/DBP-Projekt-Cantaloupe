"use strict";

const savedUserId = window.localStorage.getItem("userId");

renderUserPlants(savedUserId);

function renderUserPlants(id) {
    document.getElementById("plantWrapper").innerHTML = "";
    const users_rqst = new Request("/PHP-filer/userRead.php")

    if (id != "") {
        fetch(users_rqst)
            .then(r => r.json())
            .then(resource => {
                resource.forEach(user => {
                    if (user.userId == id) {
                        user.owns.forEach(plant => {
                            const user_plant_rqst = new Request(`/PHP-filer/userPlantRead.php?userPlantId=${plant}`);
                            fetch(user_plant_rqst)
                                .then(r => r.json())
                                .then(user_plant => {
                                    const user_plant_id = user_plant.plantId;

                                    const plant_rqst = new Request(`/PHP-filer/plantRead.php?plantId=${user_plant_id}`);

                                    fetch(plant_rqst)
                                        .then(r => r.json())
                                        .then(plant_info => {
                                            let div = document.createElement("div");
                                            div.classList.add("userPlantDiv");
                                            div.innerHTML = `
                                            <h3>${plant_info.name}</h3>
                                            <p>Vattnad senast: <br>${user_plant.water[user_plant.water.length - 1]}</p>
                                            <span class="material-symbols-outlined warning_bugs">emergency_home</span>
                                            <div id="plantButtons">
                                            <span class="material-symbols-outlined water_but">water_drop</span>
                                            <span class="material-symbols-outlined bug_but">bug_report</span>
                                            <span class="material-symbols-outlined delete_but">delete</span>
                                            </div>
                                            `;

                                            document.getElementById("plantWrapper").appendChild(div);

                                            if (user_plant.bugs == true) {
                                                div.querySelector(".warning_bugs").style.visibility = "visible";
                                            }

                                            const del_but = div.querySelector(".delete_but");
                                            del_but.style.cursor = "pointer";
                                            del_but.addEventListener("click", function () {
                                                eventDelBut(user_plant.userPlantId);
                                            })

                                            const bug_but = div.querySelector(".bug_but");
                                            bug_but.style.cursor = "pointer";
                                            bug_but.addEventListener("click", function () {
                                                eventBugBut(user_plant.userPlantId, !user_plant.bugs);
                                            })

                                            const wat_but = div.querySelector(".water_but");
                                            wat_but.style.cursor = "pointer";
                                            wat_but.addEventListener("click", function () {
                                                eventWatBut(user_plant.userPlantId);
                                            })
                                        });
                                })

                        })

                    }
                })


            })


    } else {
        document.getElementById("plantWrapper").innerHTML = "<h1>AP AP AP du måste logga in först!</h1>";
    }

}

function eventDelBut (userPlantId) {
    const del_rqst = new Request("/PHP-filer/userPlantDelete.php", {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            "userPlantId": userPlantId
        })
    });
// TODO: MÅSTE KUNNA TA BORT FRÅN USER OWNS OCKSÅ
    fetch(del_rqst)
        .then(response => response.json())
        .then(resource => {
            renderUserPlants(savedUserId)
        });
}

function eventBugBut (userPlantId, TorF) {
    const bug_rqst = new Request("/PHP-filer/bugUpdate.php", {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            "userPlantId": userPlantId,
            "bugs": TorF
        })
    });

    fetch(bug_rqst)
        .then(response => response.json())
        .then(resource => {
            renderUserPlants(savedUserId)
        });   
}

function eventWatBut (userPlantId) {
    const wat_rqst = new Request("/PHP-filer/waterUpdate.php", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            "userPlantId": userPlantId
        })
    });

    fetch(wat_rqst)
        .then(response => response.json())
        .then(resource => {
            renderUserPlants(savedUserId);
        });
}

const waterAllBut = document.getElementById("waterAll");
waterAllBut.style.cursor = "pointer";
waterAllBut.addEventListener("click", function () {
    waterAll(savedUserId);
});

function waterAll (savedUserId) {

    const users_rqst = new Request(`/PHP-filer/userRead.php?userId=${savedUserId}`);

    fetch(users_rqst)
        .then(r => r.json())
        .then(user => {
            user.owns.forEach(plant => {
                console.log(plant);
                const user_plant_rqst = new Request(`/PHP-filer/userPlantRead.php?userPlantId=${plant}`);

                fetch(user_plant_rqst)
                    .then(r => r.json())
                    .then(user_plant => {
                        const wat_rqst = new Request("/PHP-filer/waterUpdate.php", {
                            method: "POST",
                            headers: { "Content-type": "application/json; charset=UTF-8" },
                            body: JSON.stringify({
                                "userPlantId": user_plant.userPlantId
                            })
                        });

                        fetch(wat_rqst)
                            .then(response => response.json())
                            .then(resource => {
                                console.log(resource);
                            })
                    })
            })
            
            renderUserPlants(savedUserId);
        })
        
        
}


function renderDatabasePlants (savedUserId) {
    const DBplants_rqst = new Request("/PHP-filer/plantRead.php");

    fetch(DBplants_rqst)
        .then(r => r.json())
        .then(resource => {
            resource.forEach(plant => {
                const div = document.createElement("div");
                div.id = "addPlantDiv" + plant.plantId;
                div.innerHTML = `
                <h3>${plant.name}<span class="material-symbols-outlined addDBPlant">add_box</span></h3>
                `;

                document.querySelector("#addPlantList").appendChild(div);

                const addButtonDBPlant = document.getElementById("addPlantDiv" + plant.plantId);
                addButtonDBPlant.style.cursor = "pointer";
                addButtonDBPlant.addEventListener("click", function () {
                    addPLantFromDB(plant.plantId, savedUserId);
                })
            })
        })
}

const add_plant_but = document.getElementById("addPlant");
add_plant_but.style.cursor = "pointer";
add_plant_but.addEventListener("click", function () {
    if (document.querySelector("#addPlantList").style.display != "none") {
        document.querySelector("#addPlantList").style.display = "none";
        document.querySelector("#addPlantList").innerHTML = "";
        document.querySelector("#addNewPlant").style.display = "none";
        
    } else {
        renderDatabasePlants(savedUserId);
        document.querySelector("#addPlantList").style.display = "grid";
        document.querySelector("#addNewPlant").style.display = "flex";
    }
    
});

function addPLantFromDB (recPlantId, savedUserId) {
    // först user plant?
    // sen users?

    const DBplants_rqst = new Request("/PHP-filer/userPlantsCreate.php", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            userId: parseInt(savedUserId),
            plantId: recPlantId
        })
    });

    fetch(DBplants_rqst)
        .then(r => r.json())
        .then(plant => {
            console.log(plant)
            const userOwns_rqst = new Request("/PHP-filer/ownsUpdate.php", {
                method: "POST",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    "userId": parseInt(savedUserId),
                    "userPlantId": plant.userPlantId
                })
            });

            fetch(userOwns_rqst)
                .then(response => response.json())
                .then(resource => {
                    console.log(resource);
                })

            if (plant.error) {
                alert("An error occured, try again!");
            }
            
            renderUserPlants(savedUserId);
        })
}

const add_own_plant_but = document.querySelector("#addNewPlant");
add_own_plant_but.style.cursor = "pointer";
// function addOwnPlant(params) {
    
// }