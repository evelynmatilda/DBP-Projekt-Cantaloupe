"use strict";

renderUserPlants(1);

function renderUserPlants (id) {
    const user_plant_rqst = new Request ("/PHP-filer/userPlantRead.php");

    if (id == 1) {
        fetch(user_plant_rqst)
            .then(r => r.json())
            .then(resource => {
                console.log(resource);
                resource.forEach(user_plant => {
                    if (user_plant.plantId == id) {
                        const user_plant_id = user_plant.plantId;

                        document.getElementById("plantWrapper").innerHTML = "";

                        const plant_rqst = new Request("/PHP-filer/plantRead.php");

                        fetch(plant_rqst)
                            .then(r => r.json())
                            .then(resource => {
                                resource.forEach(plant => {
                                    if (plant.plantId == user_plant_id) {
                                        let div = document.createElement("div");
                                        div.classList.add("userPlantDiv");
                                        div.innerHTML = `
                                        <h3>${plant.name}</h3>
                                        <p>Vattnad senast: <br></p>
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
                                        eventDelBut(user_plant_id);
                                    })

                                    const bug_but = div.querySelector(".bug_but");
                                    bug_but.style.cursor = "pointer";
                                    bug_but.addEventListener("click", function () {
                                        eventBugBut(user_plant_id, !user_plant.bugs); 
                                    })
                                    }
                                });
                            });
                    }
                })  
            })
    } else {
        document.getElementById("plantWrapper").innerHTML = "<h1>AP AP AP du måste logga in först!</h1>";
    }
    
}

function eventDelBut (plantId) {
    const del_rqst = new Request("/PHP-filer/userPlantDelete.php", {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            "userPlantId": plantId
        })
    });

    fetch(del_rqst)
        .then(response => response.json())
        .then(resource => renderUserPlants(1));
}

function eventBugBut (plantId, TorF) {
    const bug_rqst = new Request("/PHP-filer/bugUpdate.php", {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            "userPlantId": plantId,
            "bugs": TorF
        })
    });

    fetch(bug_rqst)
        .then(response => response.json())
        .then(resource => renderUserPlants(1));   
}