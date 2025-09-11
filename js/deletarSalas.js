// Formulário para deletar uma sala
function deletarSala() {
    const form = document.querySelector("#formDeletarSala");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const salaId = form.selectId.value; // assume que o input do form tem o id da sala

        try {
            const resp = await fetch(`${urlRooms}/${salaId}`, {
                method: "DELETE",
            });

            if (resp.ok) {
                // Remove a sala do array local
                rooms = rooms.filter((sala) => sala.id !== salaId);
                criarCards(rooms, reservations); // redesenha cards
            } else {
                console.error("Erro ao deletar sala");
            }
        } catch (erro) {
            console.error("Erro na requisição:", erro);
        }
    });
}
// deletarSala();
