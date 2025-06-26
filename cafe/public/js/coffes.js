document.addEventListener("DOMContentLoaded", function () {
  const createForm = document.getElementById("createForm");
  const tabelaCoffeeBody = document.querySelector(".tabela-coffee tbody");
  const mensagemSucesso = document.getElementById("mensagemSucesso");
  const cancelarEdicaoBtn = document.getElementById("cancelarEdicao");
  const hiddenId = document.getElementById("hiddenId");

  const apiBase = "http://localhost:3000/Coffee";

  function exibirMensagem(texto, sucesso = true) {
    mensagemSucesso.textContent = texto;
    mensagemSucesso.style.color = sucesso ? "green" : "red";
    mensagemSucesso.style.display = "block";

    setTimeout(() => {
      mensagemSucesso.style.display = "none";
      mensagemSucesso.textContent = "";
    }, 3000);
  }

  async function listarCoffee() {
    try {
      const res = await fetch(apiBase);
      const data = await res.json();

      if (!data || data.length === 0) {
        tabelaCoffeeBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Nenhum café encontrado.</td></tr>`;
        return;
      }

      tabelaCoffeeBody.innerHTML = data
        .map(
          (coffee) => `
        <tr>
          <td>${coffee.id ?? "-"}</td>
          <td>${coffee.name}</td>
          <td>${coffee.intensidade}</td>
          <td>${coffee.preco}</td>
          <td>
            <button class="editar" data-id="${coffee.id}">Editar</button>
            <button class="excluir" data-id="${coffee.id}">Excluir</button>
          </td>
        </tr>`
        )
        .join("");
    } catch (err) {
      exibirMensagem("Erro ao listar café", false);
    }
  }

  async function salvarCoffee(e) {
    e.preventDefault();

    const id = hiddenId.value;
    const name = createForm.querySelector('input[name="name"]').value.trim();
    const intensidade = createForm.querySelector('input[name="intensidade"]').value.trim();
    const preco = createForm.querySelector('input[name="preco"]').value;

    if (!name || !intensidade || !preco) {
      exibirMensagem("Preencha todos os campos.", false);
      return;
    }

    try {
      let res, data;

      if (id) {
        res = await fetch(`${apiBase}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, intensidade, preco }),
        });
        data = await res.json();

        if (res.ok) {
          exibirMensagem("Café atualizado com sucesso");
        } else {
          exibirMensagem(data.message || "Erro ao atualizar", false);
        }
      } else {
        res = await fetch(apiBase, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, intensidade, preco }),
        });
        data = await res.json();

        if (res.ok) {
          exibirMensagem("Café cadastrado com sucesso");
        } else {
          exibirMensagem(data.message || "Erro ao cadastrar", false);
        }
      }

      createForm.reset();
      hiddenId.value = "";
      cancelarEdicaoBtn.style.display = "none";

      listarCoffee();
    } catch (err) {
      exibirMensagem("Erro de rede: " + err.message, false);
    }
  }

  async function deletarCoffee(id) {
    if (!confirm("Tem certeza que deseja deletar este café?")) return;

    try {
      const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });

      if (res.status === 204) {
        exibirMensagem("Café deletado com sucesso");
        listarCoffee();
      } else {
        const data = await res.json();
        exibirMensagem(data.message || "Erro ao deletar", false);
      }
    } catch (err) {
      exibirMensagem("Erro ao deletar café", false);
    }
  }

  async function carregarCoffeeParaEdicao(id) {
    try {
      const res = await fetch(`${apiBase}/${id}`);
      if (!res.ok) throw new Error("Café não encontrado");
      const coffee = await res.json();

      hiddenId.value = coffee.id;
      createForm.querySelector('input[name="name"]').value = coffee.name;
      createForm.querySelector('input[name="intensidade"]').value = coffee.intensidade;
      createForm.querySelector('input[name="preco"]').value = coffee.preco;

      cancelarEdicaoBtn.style.display = "inline-block";
      exibirMensagem(`Editando café de ID ${coffee.id}`);
    } catch (error) {
      exibirMensagem(error.message, false);
    }
  }

  createForm.addEventListener("submit", salvarCoffee);

  cancelarEdicaoBtn.addEventListener("click", () => {
    createForm.reset();
    hiddenId.value = "";
    cancelarEdicaoBtn.style.display = "none";
    mensagemSucesso.style.display = "none";
  });

  tabelaCoffeeBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("editar")) {
      const id = e.target.dataset.id;
      carregarCoffeeParaEdicao(id);
    }
    if (e.target.classList.contains("excluir")) {
      const id = e.target.dataset.id;
      deletarCoffee(id);
    }
  });

  listarCoffee();
});