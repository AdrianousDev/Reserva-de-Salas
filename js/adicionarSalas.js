// Urls da API
const urlRooms =
    "https://sistema-de-reservas-node-js-express.onrender.com/api/rooms";

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
            // split(",") divide a string em um array, usando a vírgula como separador (ref de quebra).
            // .map((r) => r.trim()) mapeia cada item do array e remove espaços do início e do fim.
        };

        try {
            const resp = await fetch(urlRooms, {
                method: "POST",
                headers: { "Content-Type": "application/json" }, // Especifica o tipo de corpo da requisição (se não tiver pode ser rejeitado)
                body: JSON.stringify(novaSala), // Transforma o objeto novaSala em uma string JSON.
            });

            if (resp.ok) {
                alert("Sala adicionada!");
            } else {
                console.error("Erro");
            }
        } catch (erro) {
            console.error("Erro na requisição:", erro);
        }
    });
}
formNovaSala();
