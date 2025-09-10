// Dados

const rooms = [
    {
        id: "8CA622CC-280E-4B13-AEB2-33CA8601A74D",
        name: "Lab 101",
        building: "Bloco A",
        capacity: 10,
        resources: ["Projetor", "Ar-condicionado", "Quadro branco"],
    },
    {
        id: "0DC06EA4-E832-4B34-84EA-F623F695F0AE",
        name: "Lab 102",
        building: "Bloco B",
        capacity: 20,
        resources: ["Projetor", "Ar-condicionado", "Quadro branco"],
    },
    {
        id: "F8784EC6-73CF-4146-BC6B-A28F2EC49588",
        name: "Lab 103",
        building: "Bloco C",
        capacity: 30,
        resources: ["Projetor", "Ar-condicionado", "Quadro branco"],
    },
    {
        id: "06D26995-3FA3-4CBC-BB75-43FCFD89A8A1",
        name: "Lab 104",
        building: "Bloco A",
        capacity: 40,
        resources: ["Projetor", "Ar-condicionado", "Quadro branco"],
    },
    {
        id: 1,
        name: "Lab 110",
        building: "Bloco Z",
        capacity: 90,
        resources: ["Projetor", "Ar-condicionado", "Quadro branco"],
    },
    {
        id: "eaa9d495-f797-4272-aa28-6e24df1f3fd2",
        name: "Lab 111",
        building: "Bloco Z",
        capacity: 90,
        resources: ["Projetor", "Ar-condicionado", "Quadro branco"],
    },
];

const reservations = [
    {
        id: "b99b6d60-4f0c-4f1a-9c0b-1d7a2b0a5c3e",
        roomId: "8CA622CC-280E-4B13-AEB2-33CA8601A74D",
        title: "Aula de Algoritmos",
        start: "2025-09-10T08:00:00.000Z",
        end: "2025-09-10T10:00:00.000Z",
        requester: "prof.gadelha",
        createdAt: "2025-09-09T15:00:00.000Z",
    },
];

// Quando a API estiver liberada, comentar o array rooms atual e criar um novo com o .json() do response da api.

// const url = "https://dummyjson.com/products";
// async function chamarApi() {
//   const resp = await fetch(url);
//   if (resp.status === 200) {
//     const obj = await resp.json();
//     adicionarNaLi(obj);
//   }
// }
// chamarApi();

// Functions

function preencherFiltros() {
    // Blocos
    const blocoSelect = document.querySelector("#bloco");
    const todosBlocos = rooms.map((x) => x.building);
    const blocos = [...new Set(todosBlocos)];

    blocos.forEach((item) => {
        const option = document.createElement("option");
        option.textContent = item;
        option.value = item;
        blocoSelect.appendChild(option);
    });

    // Capacidade
    const capacidadeSelect = document.querySelector("#capacidade");
    const todasCapacidades = rooms.map((x) => x.capacity);
    const capacidades = [...new Set(todasCapacidades)];

    capacidades.forEach((item) => {
        const option = document.createElement("option");
        option.textContent = item;
        option.value = item;
        capacidadeSelect.appendChild(option);
    });

    // Recursos
    const recursosSelect = document.querySelector("#recursos");
    const todosRecursos = rooms.flatMap((x) => x.resources);
    const recursos = [...new Set(todosRecursos)];
    // console.log(recursos);

    recursos.forEach((item) => {
        const option = document.createElement("option");
        option.textContent = item;
        option.value = item;
        recursosSelect.appendChild(option);
    });
}
preencherFiltros();

function criarCards(json) {
    const ul = document.querySelector(".salas-list");
    const listaSalas = json;
    // console.log(listaSalas);

    listaSalas.forEach((item) => {
        const liGeral = document.createElement("li");
        // liGeral.value = item.id;
        // console.log(item.id);

        const ulSobre = document.createElement("ul");

        const liNomeLab = document.createElement("li");
        const liBloco = document.createElement("li");
        const liCapacidade = document.createElement("li");
        const liRecursos = document.createElement("li");

        liNomeLab.textContent = `${item.name}`;
        liBloco.textContent = `${item.building}`;
        liCapacidade.textContent = `${item.capacity}`;
        liRecursos.textContent = `${item.resources}`;

        ulSobre.appendChild(liNomeLab);
        ulSobre.appendChild(liBloco);
        ulSobre.appendChild(liCapacidade);
        ulSobre.appendChild(liRecursos);

        liGeral.appendChild(ulSobre);
        ul.appendChild(liGeral);
    });
}
criarCards(rooms);

function filtrarCards() {
    const formFiltro = document.querySelector(".form-filtro");
    formFiltro.addEventListener("submit", (e) => {
        e.preventDefault();

        const blocoValue = document.querySelector("#bloco").value;
        const capacidadeValue = Number(
            document.querySelector("#capacidade").value
        );
        const recursosValue = document.querySelector("#recursos").value;

        console.log(blocoValue, capacidadeValue, recursosValue);

        // array com todas as salas que batem com os 3 critérios (filtrin)
        const salasFiltradas = rooms.filter(
            (x) =>
                x.building === blocoValue &&
                x.capacity <= capacidadeValue &&
                x.resources.includes(recursosValue)
        );

        // apaga tudo e cria os cards com base no novo array
        const ulGeral = document.querySelector(".salas-list");
        ulGeral.innerHTML = "";
        criarCards(salasFiltradas);
    });
}
filtrarCards();

// events listener gerais

const mostrarTudoButton = document.querySelector("#mostrarTudo");
mostrarTudoButton.addEventListener("click", () => {
    const ulGeral = document.querySelector(".salas-list");
    ulGeral.innerHTML = "";
    criarCards(rooms);
});
