const urlBase = "http://localhost:3000";

function obterImoveis() {
    fetch(`${urlBase}/imoveis`, { method: 'GET' })
        .then(resposta => {
            if (resposta.ok) return resposta.json();
        })
        .then(conteudoJSON => {
            if (!conteudoJSON) return;

            const elementoSelecionado = document.getElementById("imoveis");
            if (elementoSelecionado) {
                elementoSelecionado.innerHTML = "";
                if (conteudoJSON.status) {
                    for (const imovel of conteudoJSON.imoveis) {
                        const option = document.createElement("option");
                        option.value = imovel.imo_id;
                        option.text = imovel.imo_titulo;
                        elementoSelecionado.appendChild(option);
                    }
                } else {
                    const opcao = document.createElement("option");
                    opcao.value = "";
                    opcao.text = "Nenhum imóvel encontrado";
                    elementoSelecionado.appendChild(opcao);
                }
            }

            const listaImoveis = document.getElementById("tabelaImoveis");
            if (listaImoveis) {
                listaImoveis.innerHTML = "";

                if (conteudoJSON.status) {
                    conteudoJSON.imoveis.forEach((imovel, index) => {
                        const tr = document.createElement("tr");
                        tr.innerHTML = `
                            <td>${imovel.imo_titulo}</td>
                            <td>${imovel.imo_tipo}</td>
                            <td>${imovel.imo_valor}</td>
                            <td>${imovel.pes_cpf ? 'Reservado' : 'Disponível'}</td>
                            <td><button class="btn btn-info reservarImoveisBtn">Reservar</button></td>
                        `;
                        listaImoveis.appendChild(tr);
                    });
                } else {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `<td colspan="6">Nenhum imóvel encontrado</td>`;
                    listaImoveis.appendChild(tr);
                }
            }

        })
        .catch(erro => {
            console.error("Erro na requisição:", erro);
        });
}

function cadastrarImovel(event) {
    if (event) event.preventDefault();

    const formulario = document.getElementById("formImovel");
    if (formulario.checkValidity()) {
        const imovel = {
            imo_titulo: document.getElementById("imo_titulo").value,
            imo_tipo: document.getElementById("imo_tipo").value,
            imo_valor: document.getElementById("imo_valor").value
        };

        fetch(urlBase + "/imoveis", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imovel)
        })
            .then(resposta => {
                if (resposta.ok) return resposta.json();
            })
            .then(conteudoJSON => {
                if (!conteudoJSON) return;

                if (conteudoJSON.status) {
                    alert("Imóvel cadastrado com sucesso!");
                    formulario.classList.remove("was-validated");
                    formulario.reset();
                    obterImoveis();
                } else {
                    alert("Erro ao cadastrar imóvel: " + conteudoJSON.mensagem);
                }
            })
            .catch(erro => {
                console.error("Erro na requisição:", erro);
                alert("Erro na comunicação com o servidor.");
            });
    } else {
        formulario.classList.add("was-validated");
    }
}

obterImoveis();
const botaoCadastrar = document.getElementById("btnCadastrar");
botaoCadastrar.addEventListener("click", cadastrarImovel);