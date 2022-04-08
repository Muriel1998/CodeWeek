const q = (selector) => document.querySelector(selector);
const types = [
    {
        id: 1,
        name: "Taglio capelli"
    },
    {
        id: 2,
        name: "Manicure"
    },
    {
        id: 3,
        name: "Altro"
    }
];


const calendario = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
];

console.log(calendario);

const buttonsHtml = types.map(type => {
    return `<button class="bottone" data-id="${type.id}">
                ${type.name}</button>`
}).join('')


console.log(buttonsHtml);

q("#nav").innerHTML = buttonsHtml;

const mesiHtml = calendario.map((mese, index) => {
    let html =  `<div class="mese">
    <h2>${mese}</h2>
    <div id="mese">
    <div id="mese${index}">
    </div>
    </div> </div>`;
    return html;
}).join("");


q("#content").innerHTML = mesiHtml




let appuntamenti = [];

const mostraAppuntamenti = (listaAppuntamenti) => {
    calendario.forEach((mese, index) => {
        let meseId = '#mese'+index;
        q(meseId).innerHTML = '';
    })
    listaAppuntamenti.forEach((appuntamento) => {
        let meseId = '#mese'+appuntamento.mese;
        let type = types.find((tipo) => tipo.id === appuntamento.typeId);
        let classe = "appuntamento";
        if (appuntamento.completed) {
            classe = "appuntamento completed"
        }
        let htmlAppuntamento = `
            <div class="${classe}">
                <h2 class="titolo-appuntamento">${appuntamento.title}</h2>
                <h5 class="tipo-appuntamento">${type.name}<h5>
            </div>
        `;
        q(meseId).innerHTML += htmlAppuntamento;
    });
}

const getData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    appuntamenti = data.map( (element) => {
        element.typeId = Math.floor(Math.random()*3)+1; 
        element.priority = Math.floor(Math.random()*3)+1;
        element.mese = Math.floor(Math.random()*11);
        return element
    });

    mostraAppuntamenti(appuntamenti);
}

getData()

// if 
// else "Nessun appuntamento"


q('.bottone').addEventListener('click', (e) => {
    console.log('c');
    let typeId = e.target.getAttribute('data-id');
    console.log(typeId);
    let appuntamentiFiltrati = appuntamenti.filter((el) => el.typeId == typeId);
    mostraAppuntamenti(appuntamentiFiltrati);
})


document.querySelectorAll('.bottone').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let typeId = e.target.getAttribute('data-id');
        let appuntamentiFiltrati = appuntamenti.filter((el) => el.typeId == typeId);
        console.log(appuntamentiFiltrati.length);
        mostraAppuntamenti(appuntamentiFiltrati);
    })
})

// const tableCalendario = document.querySelector("table");
// const righeCalendario = calendario.map((element) => `<tr><td>${element}</td></tr>`);
// tableCalendario.innerHTML = righeCalendario.join("");

// const days = [
//     "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "", "", "", "", "", "", "", "", "", "", "", "",
// ]