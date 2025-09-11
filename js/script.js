// Dados

// const rooms = [
//     {
//         id: "8CA622CC-280E-4B13-AEB2-33CA8601A74D",
//         name: "Lab 101",
//         building: "Bloco A",
//         capacity: 10,
//         resources: ["Projetor", "Ar-condicionado", "Quadro branco"],
//     },
//     {
//         id: "0DC06EA4-E832-4B34-84EA-F623F695F0AE",
//         name: "Lab 102",
//         building: "Bloco B",
//         capacity: 20,
//         resources: ["Projetor", "Ar-condicionado", "Quadro branco"],
//     },
//     {
//         id: "F8784EC6-73CF-4146-BC6B-A28F2EC49588",
//         name: "Lab 103",
//         building: "Bloco C",
//         capacity: 30,
//         resources: ["Projetor", "Ar-condicionado", "Quadro branco"],
//     },
//     {
//         id: "06D26995-3FA3-4CBC-BB75-43FCFD89A8A1",
//         name: "Lab 104",
//         building: "Bloco A",
//         capacity: 40,
//         resources: ["Projetor", "Ar-condicionado", "Quadro branco"],
//     },
//     {
//         id: 1,
//         name: "Lab 110",
//         building: "Bloco Z",
//         capacity: 90,
//         resources: ["Projetor", "Ar-condicionado", "Quadro branco"],
//     },
//     {
//         id: "eaa9d495-f797-4272-aa28-6e24df1f3fd2",
//         name: "Lab 111",
//         building: "Bloco Z",
//         capacity: 90,
//         resources: ["Projetor", "Ar-condicionado", "Quadro branco"],
//     },
// ];

// const reservations = [
//     {
//         id: "b99b6d60-4f0c-4f1a-9c0b-1d7a2b0a5c3e",
//         roomId: "8CA622CC-280E-4B13-AEB2-33CA8601A74D",
//         title: "Aula de Algoritmos",
//         start: "2025-09-10T08:00:00.000Z",
//         end: "2025-09-10T10:00:00.000Z",
//         requester: "prof.gadelha",
//         createdAt: "2025-09-09T15:00:00.000Z",
//     },
// ];

// Quando a API estiver liberada, comentar o array rooms atual e criar um novo com o .json() do response da api.

const url =
    "https://sistema-de-reservas-node-js-express.onrender.com/api/rooms";

async function chamarApi() {
    const resp = await fetch(url);
    if (resp.status === 200) {
        const obj = await resp.json();
        return obj;
    } else {
        console.error("Erro ao buscar dados da API");
        return [];
    }
}

// preenche os selects
function preencherFiltros(rooms) {
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

    recursos.forEach((item) => {
        const option = document.createElement("option");
        option.textContent = item;
        option.value = item;
        recursosSelect.appendChild(option);
    });
}

// cria os cards na lista
function criarCards(listaSalas) {
    const ul = document.querySelector(".salas-list");
    listaSalas.forEach((item) => {
        const liGeral = document.createElement("li");
        const ulSobre = document.createElement("ul");

        const liNomeLab = document.createElement("li");
        const liBloco = document.createElement("li");
        const liCapacidade = document.createElement("li");
        const liRecursos = document.createElement("li");

        liNomeLab.textContent = `${item.name}`;
        liBloco.textContent = `${item.building}`;
        liCapacidade.textContent = `${item.capacity}`;
        liRecursos.textContent = `${item.resources.join(", ")}`;

        ulSobre.appendChild(liNomeLab);
        ulSobre.appendChild(liBloco);
        ulSobre.appendChild(liCapacidade);
        ulSobre.appendChild(liRecursos);

        liGeral.appendChild(ulSobre);
        ul.appendChild(liGeral);
    });
}

// filtra cards conforme formulário
function filtrarCards(rooms) {
    const formFiltro = document.querySelector(".form-filtro");
    formFiltro.addEventListener("submit", (e) => {
        e.preventDefault();

        const blocoValue = document.querySelector("#bloco").value;
        const capacidadeValue = Number(
            document.querySelector("#capacidade").value
        );
        const recursosValue = document.querySelector("#recursos").value;

        const salasFiltradas = rooms.filter(
            (x) =>
                x.building === blocoValue &&
                x.capacity <= capacidadeValue &&
                x.resources.includes(recursosValue)
        );

        // apaga tudo e cria os cards com base no novo array dado pelo filter
        const ulGeral = document.querySelector(".salas-list");
        ulGeral.innerHTML = "";
        criarCards(salasFiltradas);
    });
}

// inicializa tudo, esperando os dados corretos da api (não o promise)
// nela foi englobado tudo o que dependia do array global 'rooms'.
async function iniciarApi() {
    const rooms = await chamarApi();
    // console.log(rooms);

    preencherFiltros(rooms);
    criarCards(rooms);
    filtrarCards(rooms);

    // botão 'mostrar tudo'
    const mostrarTudoButton = document.querySelector("#mostrarTudo");
    mostrarTudoButton.addEventListener("click", () => {
        const ulGeral = document.querySelector(".salas-list");
        ulGeral.innerHTML = "";
        criarCards(rooms);
    });
}
iniciarApi();
// iniciar() foi criado pois antes a variável rooms = [] recebia o json que o professor passou (global).
// mas para conseguir 'puxar' um json, a gente precisa de uma async function, para garantir que esses dados seráo recebidos.
// e o js por ser interpretado e não compilado, ocorre que o funcionamento não é igual um algoritmo.
