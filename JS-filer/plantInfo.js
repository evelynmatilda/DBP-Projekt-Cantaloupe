
let request = "http://localhost:8888/plants.json";

function plantInfoDiv(){
    fetch(request)
    .then(r => r.json())
    .then(resource => {
        resource.forEach(plant => {
           let plantDiv = document.createElement("div");
           plantDiv.classList.add("plantDiv");
           plantDiv.innerHTML = `
           <h2>${plant.name} (${plant.latin})</h2>
           <p>${plant.info}</p>
           `;
           let wrapper = document.querySelector("#wrapper");
           wrapper.append(plantDiv)
        })
    } )
   
}

plantInfoDiv()