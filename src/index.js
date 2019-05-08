

let planets = [];
let people = [];
const planetsEl = document.querySelector("#planets");
const peopleEl = document.querySelector("#people");

getPlanets()
    .then(data => {
        console.log("máš data");
        planets = data;
        
        showPlanets();
    
        getPeople(planets[0].people);
    })
    .catch(error => console.log(error));

async function getPlanets(){ //async funkce dělá z asynchronní funkce synchronní -> můžeš v ní použít await

    fetch("https://swapi.co/api/planets/") //vrátí promis
        let response = await fetch("https://swapi.co/api/planets/"); //počkej až se vrátí data z promis
        let data = await response.json();

        return data.results.map(planet => { //nad každou položkou pole se zavolá funkce -> cokoliv se vrátí se stane položkou v novém přemapovaném poli
            return {
                name: planet.name,
                dayLenght: planet.rotation_period,
                yearLenght: planet.orbital_period,
                people: planet.residents,
            }

        }); 
        

        //.then(response => response.json()) //v závorkách je funkce, která se udělá, jakmile data z promis přijdou - přijme jeden parametr, vloží je do proměnné a založí funkci -> další promis
        //.then(data => console.log(data));
}

/* první možnost
function showPlanets(){
    let html = "";
    planets.forEach(planet => {
        html += `<div class="planet">
            <div class="planet__name">${planet.name}</div>
            <div class="planet_count">${planet.people.length}<i class="fas fa-child"></i></div>
        </div>`;
    });

    planetsEl.innerHTML = html;
}

druhá možnost téhož*/

function showPlanets(){
    let html = "";
    html = planets.reduce((total, planet) => {
        return total + `<div class="planet">
        <div class="planet__name">${planet.name}</div>
        <div class="planet_count">${planet.people.length}<i class="fas fa-child"></i></div>
        </div>`;
    }, "" ) //začíná se s prázdným řetězcem
    planetsEl.innerHTML = html;
}

async function getPerson(url){
    let response = await fetch(url);
    let data = await response.json();

    return {
        name: data.name,
        gender: data.gender,
        height: data.height,
        hair: data.hair_color,
        eyes: data.eye_color
    }
}

//getPerson("https://swapi.co/api/people/5/").then(person => console.log(person));

async function getPeople(persons){
    let personPromises = persons.map(person => {
        //return fetch(person); použili bychom pokud bychom nemělu getPerson
        return getPerson(person);
    });

    Promise.all(personPromises)
        .then(responses => {
            people = responses;
            showPeople();
        });
}

function showPeople(){
    let html = "";
    html = people.reduce((total, person) => {
        return total + `<div class="person">
            <div class="person__icon"><i class="fas fa-robot"></i></div>
            <h2 class="person__name">${person.name}</h2>
            <p class="person__info">
          Hair: ${person.hair}<br>
          Eyes: ${person.eyes}<br>
          Height: ${person.height}
            </p>
        </div>`;
    }, "" ) //začíná se s prázdným řetězcem
    peopleEl.innerHTML = html;
}

//Promises.all([promis1, promis2, promis3]).then(xxxx) - vytvoří pole a do každé položky dá jednu promis a až se to naplní, udělá se nějaká funkce

