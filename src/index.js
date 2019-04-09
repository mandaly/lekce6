getPlanets().then(data => {
    console.log("máš data");
    console.log(data);
}
    
);

async function getPlanets(){ //async funkce dělá z asynchronní funkce synchronní -> můžeš v ní použít await

    fetch("https://swapi.co/api/planets/") //vrátí promis
        let response = await fetch("https://swapi.co/api/planets/"); //počkej až se vrátí data z promis
        let data = await response.json();

        return data;
        

        //.then(response => response.json()) //v závorkách je funkce, která se udělá, jakmile data z promis přijdou - přijme jeden parametr, vloží je do proměnné a založí funkci -> další promis
        //.then(data => console.log(data));
}

console.log("konec");

