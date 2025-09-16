// Urls da API
const urlRooms =
    "https://sistema-de-reservas-node-js-express.onrender.com/api/rooms";

// Função para buscar dados da API
async function chamarDadosApi(url) {
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
function preencherOpcoes(rooms) {
    const select = document.querySelector("#selectDelete");
    const salas = rooms;

    salas.forEach((item) => {
        const option = document.createElement("option");
        option.value = `${item.id}`;
        option.textContent = `${item.name} - ${item.building}`;
        select.appendChild(option);
    });
}

// Inicializa a aplicação
async function iniciarApiRooms() {
    const rooms = await chamarDadosApi(urlRooms);
    preencherOpcoes(rooms);
}
iniciarApiRooms();

// Formulário para deletar uma sala
function deletarSala() {
    const form = document.querySelector("#formDeletarSala");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const salaId = form.selectDelete.value; // assume que o input do form tem o id da sala
        const salaNome =
            form.selectDelete.options[form.selectDelete.selectedIndex].text;

        const confirmarExclusao = confirm(
            `Tem certeza que deseja excluir ${salaNome}?`
        );

        if (confirmarExclusao) {
            try {
                const resp = await fetch(`${urlRooms}/${salaId}`, {
                    method: "DELETE",
                });

                if (resp.ok) {
                    alert("Sala excluida com sucesso!");
                } else {
                    console.error("Erro ao deletar sala");
                }
            } catch (erro) {
                console.error("Erro na requisição:", erro);
            }
        } else {
            alert("Exclusão cancelada.");
        }
    });
}
deletarSala();
