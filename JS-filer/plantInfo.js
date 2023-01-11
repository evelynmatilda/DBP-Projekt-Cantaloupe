
let request = "../JSON-filer/plants.json";

function plantInfoDiv(){
    fetch(request)
    .then(r => r.json())
    .then(resource => {
        resource.forEach(plant => {
            if(plant.flowers == false){
            plant.flowers = "Nej";
           } else{
            plant.flowers = "Ja";
           };
           let plantDiv = document.createElement("div");
           plantDiv.classList.add("plantDiv-closed");
           plantDiv.innerHTML = `
           <h2>${plant.name} <br>(${plant.latin})</h2>
           <img src="${plant.img}"></img>
           <p>Vattnas gånger/veckan? <br>${plant.waterInt}</p>
           <p>Blommar den? <br>${plant.flowers}</p>
           <p>Hur mycket ljus behöver den? <br>${plant.sun}</p>
           <p>${plant.info}</p>
           `;
           let wrapper = document.querySelector("#wrapper");
           wrapper.append(plantDiv);
           
            plantDiv.addEventListener("click", function(){
        if (plantDiv.className == "plantDiv-closed"){
            plantDiv.className = "plantDiv-opened";
        }
            else {
            plantDiv.className = "plantDiv-closed";
        }
    });
        })
    } )
   
}



plantInfoDiv()