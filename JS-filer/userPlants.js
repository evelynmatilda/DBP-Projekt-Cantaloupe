"use strict";

const savedUserId = window.localStorage.getItem("userId");

renderUserPlants(savedUserId);

function renderUserPlants(id) {
    document.getElementById("plantWrapper").innerHTML = "";
    const users_rqst = new Request("../PHP-filer/userRead.php")

    if (id == null) {
        let notLoggedIn = document.createElement("div");
        notLoggedIn.classList.add("notLoggedIn");
        let notLoggedInText = document.createElement("div");
        notLoggedInText.classList.add("notLoggedInText");
        notLoggedInText.innerHTML = "<h1>AP AP AP! Du måste logga in först! Tryck på profil-ikonen i högra hörnet för att logga in</h1>";
        document.querySelector("body").append(notLoggedIn);
        notLoggedIn.append(notLoggedInText)
    } else {
        fetch(users_rqst)
            .then(r => r.json())
            .then(resource => {
                resource.forEach(user => {
                    if (user.userId == id) {
                        user.owns.forEach(plant => {
                            const user_plant_rqst = new Request(`../PHP-filer/userPlantRead.php?userPlantId=${plant}`);
                            fetch(user_plant_rqst)
                                .then(r => r.json())
                                .then(user_plant => {
                                    const user_plant_id = user_plant.plantId;

                                    const plant_rqst = new Request(`../PHP-filer/plantRead.php?plantId=${user_plant_id}`);
                                    fetch(plant_rqst)
                                        .then(r => r.json())
                                        .then(plant_info => {
                                            if(user_plant.water[user_plant.water.length - 1] == undefined){
                                                user_plant.water[user_plant.water.length - 1] = "Ej vattnad"; 
                                            }
                                            let div = document.createElement("div");
                                            div.classList.add("userPlantDiv");
                                            div.id = user_plant.userPlantId;
                                            div.innerHTML = `
                                            <h3>${plant_info.name}</h3>
                                            <p>Vattnad senast: <br>${user_plant.water[user_plant.water.length - 1]}
                                            </p> 
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
                                            del_but.addEventListener("click", function (event) {
                                                event.stopPropagation()
                                                eventDelBut(user_plant.userPlantId);
                                            })

                                            const bug_but = div.querySelector(".bug_but");
                                            bug_but.style.cursor = "pointer";
                                            bug_but.addEventListener("click", function (event) {
                                                event.stopPropagation()
                                                eventBugBut(user_plant.userPlantId, !user_plant.bugs);
                                            })

                                            const wat_but = div.querySelector(".water_but");
                                            wat_but.style.cursor = "pointer";
                                            wat_but.addEventListener("click", function (event) {
                                                event.stopPropagation()
                                                eventWatBut(user_plant.userPlantId);
                                            })

                                            const infoBut = document.createElement("div");
                                            infoBut.classList.add("infoBut")
                                            const infoSpan = document.createElement("span");
                                            infoSpan.classList.add("material-symbols-outlined")
                                            infoSpan.textContent = "info"
                                            infoSpan.id = user_plant.userPlantId;
                                            infoBut.append(infoSpan);
                                            div.append(infoBut);
                                            infoSpan.addEventListener("click", function(event){
                                                event.stopPropagation()
                                                plantOverlay(user_plant, event, plant_info);
                                            })
                                            
                                        });
                                })

                        })

                    }
                })


            })
    }

}

function plantOverlay(user_plant, event, plant_info){
    let overlay = document.querySelector(".plantProfileOverlay");
    overlay.style.display = "block"
    overlay.style.width = "100vw";
    overlay.style.height = "91vh";
    let overlayWrapper = document.querySelector("#overlayWrapper");
    let exit = document.querySelector("#exit");
    exit.addEventListener("click", function(){
        overlay.style.display = "none";
        overlayWrapper.innerHTML = "";
    })
    
    if(plant_info.flowers == false){
        plant_info.flowers = "Nej";
       } else{
        plant_info.flowers = "Ja";
       };
    if (user_plant.userPlantId == event.target.id){overlayWrapper.innerHTML = `<div id="nameBox"> <h1>${plant_info.name}</h1> <h2>(${plant_info.latin})</h2> <div id="lastWater"> <p>Senast vattnad:</p> ${user_plant.water[user_plant.water.length - 1]}</div></div> <div id="plantInfo"> <h2>Info om växten</h2> <p>${plant_info.info}</p> </div> <div id="otherInfo"> <div id="plantSun"><h3>Ljus:</h3> ${plant_info.sun} </div> <div id="plantBlom"><h3>Blommar:</h3>${plant_info.flowers}</div> <div id="plantWater"><h3>Vattnas ggr/v:</h3> ${plant_info.waterInt} </div></div> <div id="waterDB"> <div id="waterText"><h3>Föregående vattningar:</h3>   ${user_plant.water}</div> </div>`
    
    }};
    

function eventDelBut (userPlantId) {
    const del_rqst = new Request("../PHP-filer/userPlantDelete.php", {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            "userPlantId": userPlantId
        })
    });
    fetch(del_rqst)
        .then(response => response.json())
        .then(plant => {
            console.log(plant);
            const userOwns_rqst = new Request("../PHP-filer/ownsDelete.php", {
                method: "DELETE",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    "userId": parseInt(savedUserId),
                    "userPlantId": plant
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

            renderUserPlants(savedUserId)
        });
}

function eventBugBut (userPlantId, TorF) {
    const bug_rqst = new Request("../PHP-filer/bugUpdate.php", {
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
    const wat_rqst = new Request("../PHP-filer/waterUpdate.php", {
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
waterAllBut.addEventListener("click", async function (event) {
    event.preventDefault();
    await waterAll();
});

async function waterAll () {
    
    const user_plant_rqst = new Request(`../PHP-filer/userPlantRead.php`);

    let resource = await (fetch(user_plant_rqst).then(r => r.json()));
    console.log(resource);
    waterAllEvent(resource, 0)
}

async function waterAllEvent (resource, counter) {
    let plant = resource[counter];

    if (savedUserId == plant.userId) {
        const wat_rqst = new Request("../PHP-filer/waterUpdate.php", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                "userPlantId": plant.userPlantId
            })
        });

        await fetch(wat_rqst);
        
        
    }
    
    counter++
    if (counter < resource.length) {
        waterAllEvent(resource, counter)
    } else {
        renderUserPlants(savedUserId)
    }
}


function renderDatabasePlants (savedUserId) {
    document.querySelector("#addPlantList").innerHTML = "";
    const DBplants_rqst = new Request("../PHP-filer/plantRead.php");

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
add_plant_but.addEventListener("click", function (event) {
    event.preventDefault();
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

    const DBplants_rqst = new Request("../PHP-filer/userPlantsCreate.php", {
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
            const userOwns_rqst = new Request("../PHP-filer/ownsUpdate.php", {
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
                    renderUserPlants(savedUserId);
                })

            if (plant.error) {
                alert("An error occured, try again!");
            }  
            
        })
}

const add_own_plant_but = document.querySelector("#addNewPlant");
add_own_plant_but.style.cursor = "pointer";

add_own_plant_but.addEventListener("click", function (event) {
    event.preventDefault();
    if (document.querySelector("#addPlantForm").style.display != "none") {
        document.querySelector("#addPlantForm").style.display = "none";
    } else {
        document.querySelector("#addPlantForm").style.display = "flex";
    }
})

const submit_own_but = document.getElementById("addButton");
submit_own_but.style.cursor = "pointer";
submit_own_but.addEventListener("click", function (event) {
    event.preventDefault();
    eventSubmitOwnBut();
});

function eventSubmitOwnBut () {
    const name = document.getElementById("nameInput").value;
    const latin = document.getElementById("latinInput").value;
    const info = document.getElementById("infoInput").value;
    const flowers = {};
    const water = parseInt(document.getElementById("waterInput").value); 
    const sun = document.getElementById("sunInput").value;

    if (document.getElementById("flowerInput").value == "false") {
        flowers.value = false;
    } else {
        flowers.value = true;
    }

    addOwnPlant(name, latin, info, water, flowers, sun);

    document.getElementById("nameInput").value = "";
    document.getElementById("latinInput").value = "";
    document.getElementById("infoInput").value = "";
}

function addOwnPlant(name, latin, info, water, flowers, sun) {
        console.log(name);
        const add_plant_rqst = new Request("../PHP-filer/plantCreate.php", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            "name": name,
            "latin": latin,
            "info": info,
            "waterInt": water,
            "flowers": flowers.value,
            "sun": sun
        })
    });

    fetch(add_plant_rqst)
        .then(response => response.json())
        .then(resource => {

            if (resource.error) {
                alert("An error occured, try again!");
            } else {
                addPLantFromDB(resource.plantId, savedUserId);
                document.querySelector("#addPlantForm").style.display = "none";
                document.querySelector("#addPlantList").style.display = "none";
                document.querySelector("#addNewPlant").style.display = "none";
            }


        });

}

const close_form_but = document.querySelector(".close");
close_form_but.style.cursor = "pointer";
close_form_but.addEventListener("click", function (event) {
    event.preventDefault();
    if (document.querySelector("#addPlantForm").style.display != "none") {
        document.querySelector("#addPlantForm").style.display = "none";
    }
})