// Urls da API

const urlRooms =
    "https://sistema-de-reservas-node-js-express.onrender.com/api/rooms";

const urlReservations =
    "https://sistema-de-reservas-node-js-express.onrender.com/api/reservations";

// Arrays globais para armazenar dados da API
// Como são dados que estão sendo usados em muitas functions, foi uma boa opção.
let rooms = [];
let reservations = [];

// Função para buscar dados da API
async function chamarApi(url) {
    try {
        const resp = await fetch(url);
        if (resp.status === 200) {
            return await resp.json();
        } else {
            console.error("Erro ao buscar dados da API");
            return []; // retorna array vazio para não quebrar o resto da aplicação
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        return [];
    }
}

// Preenche os selects do formulário de filtro
function preencherFiltros(rooms) {
    // Blocos
    const blocoSelect = document.querySelector("#bloco");
    const blocos = [...new Set(rooms.map((x) => x.building))];
    blocos.forEach((item) => {
        const option = document.createElement("option");
        option.textContent = item;
        option.value = item;
        blocoSelect.appendChild(option);
    });

    // Capacidade
    const capacidadeSelect = document.querySelector("#capacidade");
    const capacidades = [...new Set(rooms.map((x) => x.capacity))];
    capacidades.forEach((item) => {
        const option = document.createElement("option");
        option.textContent = item;
        option.value = item;
        capacidadeSelect.appendChild(option);
    });

    // Recursos
    const recursosSelect = document.querySelector("#recursos");
    const recursos = [...new Set(rooms.flatMap((x) => x.resources))];
    recursos.forEach((item) => {
        const option = document.createElement("option");
        option.textContent = item;
        option.value = item;
        recursosSelect.appendChild(option);
    });
}

// Cria os cards na lista de salas
function criarCards(listaSalas, listaReservas) {
    const ul = document.querySelector(".salas-list");
    ul.innerHTML = ""; // limpa lista antes de adicionar. Ajuda na redundância de outras functions.

    listaSalas.forEach((item) => {
        const liGeral = document.createElement("li");
        liGeral.id = `room-${item.id}`;

        // Verifica se a sala está ocupada
        const ocupada =
            listaReservas?.some((res) => res.roomId === item.id) ?? false;
        liGeral.classList.add(ocupada ? "ocupada" : "livre");

        // Cria elementos para exibir informações da sala
        const liNomeLab = document.createElement("li");
        const liBloco = document.createElement("li");
        const liCapacidade = document.createElement("li");
        const liRecursos = document.createElement("li");

        liNomeLab.textContent = item.name;
        liBloco.textContent = item.building;
        liCapacidade.textContent = item.capacity;
        liRecursos.textContent = item.resources.join(" | "); // apenas visual

        const ulSobre = document.createElement("ul");
        ulSobre.append(liNomeLab, liBloco, liCapacidade, liRecursos);

        liGeral.appendChild(ulSobre);
        ul.appendChild(liGeral);
    });
}

// Filtra cards conforme formulário
function filtrarCards(rooms, reservations) {
    const formFiltro = document.querySelector("#form-filtro");
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

        criarCards(salasFiltradas, reservations); // redesenha cards filtrados
    });
}

// Inicializa a aplicação
async function iniciarApiRooms() {
    rooms = await chamarApi(urlRooms);
    reservations = await chamarApi(urlReservations);

    preencherFiltros(rooms);
    criarCards(rooms, reservations);
    filtrarCards(rooms, reservations);

    // Botão "mostrar tudo"
    const mostrarTudoButton = document.querySelector("#mostrarTudo");
    mostrarTudoButton.addEventListener("click", () => {
        criarCards(rooms, reservations);
    });
}
iniciarApiRooms();

// Formulário para criar nova sala
function formNovaSala() {
    const form = document.querySelector("#formNovaSala");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const novaSala = {
            name: form.name.value,
            building: form.building.value,
            capacity: Number(form.capacity.value),
            resources: form.resources.value.split(",").map((r) => r.trim()),
            // split(",") divide a string em um array, usando a vírgula como separador.
            // .map((r) => r.trim()) mapeia cada item do array e remove espaços do início e do fim.
        };

        try {
            const resp = await fetch(urlRooms, {
                method: "POST",
                headers: { "Content-Type": "application/json" }, // Especifica o tipo de corpo da requisição (se não tiver pode ser rejeitado)
                body: JSON.stringify(novaSala), // Transforma o objeto novaSala em uma string JSON.
            });

            if (resp.ok) {
                const dados = await resp.json();
                rooms.push(dados); // atualiza array local
                criarCards(rooms, reservations); // redesenha cards
            } else {
                console.error("Erro ao criar sala");
            }
        } catch (erro) {
            console.error("Erro na requisição:", erro);
        }
    });
}
formNovaSala();
