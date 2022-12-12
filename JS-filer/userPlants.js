"use strict";

renderUserPlants(1);

function renderUserPlants (id) {
    const plant_rqst = new Request ("/PHP-filer/plantRead.php");

    if (id === 1) {
        fetch(plant_rqst)
            .then(r => r.json())
            .then(resource => {
                resource.forEach(plant => {
                    if (plant.plantID = id) {
                        const plant_name = plant.name;

                        document.getElementById("plantWrapper").innerHTML = "";

                        const user_plant_rqst = new Request("/PHP-filer/userPlantRead.php");

                        fetch(user_plant_rqst)
                            .then(r => r.json())
                            .then(resource => {
                                resource.forEach(plant => {
                                    let div = document.createElement("div");
                                    div.classList.add("userPlantDiv");
                                    div.innerHTML = `
                                    <h3>${plant_name}</h3>
                                    <p>Vattnad senast: <br></p>
                                    <div id="plantButtons">
                                    <span class="material-symbols-outlined">water_drop</span>
                                    <span class="material-symbols-outlined">bug_report</span>
                                    <span class="material-symbols-outlined">delete</span>
                                    </div>
                                    `;
                                });
                            });
                    }
                })  
            })
    } else {
        document.getElementById("plantWrapper").innerHTML = "<h1>AP AP AP du måste logga in först!</h1>";
    }
    
}