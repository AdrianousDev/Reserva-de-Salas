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

function filtrarSalas() {
    const bloco = document.querySelector("#bloco");
    console.log(bloco.value);
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    filtrarSalas();
});

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
}
preencherFiltros();

const tbody = document.querySelector("tbody");
const apresentarSalas = () => {
    tbody.innerHTML = "";

    rooms.forEach((sala, index) => {
        const tr = document.createElement("tr");

        const tdLab = document.createElement("td");
        tdLab.textContent = sala.name;

        const tdBloco = document.createElement("td");
        tdBloco.textContent = sala.building;

        const tdCapacidade = document.createElement("td");
        tdCapacidade.textContent = sala.capacity;

        const tdRecursos = document.createElement("td");
        tdRecursos.textContent = sala.resources;

        tr.appendChild(tdLab);
        tr.appendChild(tdBloco);
        tr.appendChild(tdCapacidade);
        tr.appendChild(tdRecursos);
        tbody.appendChild(tr);

        // tdTime.classList.add("d-flex", "align-items-center", "gap-2");
        // tdTime.appendChild(img);

        // spanName.innerText = time.name;
        // tdTime.appendChild(spanName);

        // const estatisticas = [
        //     time.pontos,
        //     time.partidasJogadas,
        //     time.vitorias,
        //     time.empates,
        //     time.derrotas,
        //     time.golsMarcados,
        //     time.golsSofridos,
        //     time.saldoGols,
        // ];
        // estatisticas.forEach((valor) => {
        //     const td = document.createElement("td");
        //     td.textContent = valor;
        //     tr.appendChild(td);
        // });
    });
};
apresentarSalas();
