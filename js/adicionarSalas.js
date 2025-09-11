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
// formNovaSala();
