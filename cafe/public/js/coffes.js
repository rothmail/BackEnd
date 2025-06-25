document.addEventListener("DOMContentLoaded", function () {
  const createForm = document.getElementById("createForm");
  const buscarForm = document.getElementById("buscarForm");
  const editarForm = document.getElementById("editarForm");
  const deletarForm = document.getElementById("deletarForm");
  const mensagemSucesso = document.getElementById("mensagemSucesso");
  const output = document.getElementById("output");

  const apiBase = "http://localhost:3000/coffee";

  function exibirMensagem(texto, sucesso = true) {
    mensagemSucesso.textContent = texto;
    mensagemSucesso.style.color = sucesso ? "green" : "red";
    setTimeout(() => mensagemSucesso.textContent = "", 3000);
  }

  if (mensagemSucesso) {
    mensagemSucesso.style.display = "none";
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
          <td>${coffee.tipo}</td>
          <td>${coffee.ano}</td>
          <td>
            <button class="editar" data-id="${coffee.id}">Editar</button>
            <button class="excluir" data-id="${coffee.id}">Excluir</button>
          </td>
        </tr>`
        )
        .join("");
    } catch (err) {
      exibirMensagem("Erro ao listar cafés", false);
    }
  }

  function mostrarResultado(dado) {
    output.textContent = JSON.stringify(dado, null, 2);
  }

  async function cadastrarCoffee(e) {
    e.preventDefault();
    const name = createForm.querySelector('input[name="name"]').value;
    const intensidade = createForm.querySelector('input[name="intensidade"]').value;
    const preco = parseInt(createForm.querySelector('input[name="preco"]').value);

    try {
      const res = await fetch(apiBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, intensidade, preco })
      });

      const data = await res.json();

      if (res.ok) {
        exibirMensagem(data.message || "Coffee cadastrado com sucesso");
        mostrarResultado(data);
      } else {
        exibirMensagem(data.message || "Erro ao cadastrar coffee", false);
      }
    } catch (err) {
      exibirMensagem("Erro de rede: " + err.message, false);
    }
  }

  async function buscarCoffee(e) {
    e.preventDefault();

    const id = buscarForm.querySelector('input[name="id"]').value;

    try {
      const res = await fetch(`${apiBase}/${id}`);
      const data = await res.json();

      if (res.ok) {
        let tabela = `<table class="tabela-coffee">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Intensidade</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${data.id ?? '-'}</td>
              <td>${data.name}</td>
              <td>${data.intensidade}</td>
              <td>${data.preco}</td>
            </tr>
          </tbody>
        </table>`;

        output.innerHTML = `<h3>Coffee Encontrado</h3>${tabela}`;
      } else {
        exibirMensagem(data.message || "Coffee não encontrado", false);
        output.innerHTML = "";
      }
    } catch (err) {
      exibirMensagem("Erro ao buscar coffee", false);
      output.innerHTML = "";
    }
  }

  async function editarCoffee(e) {
    e.preventDefault();

    const id = editarForm.querySelector('input[name="id"]').value;
    const name = editarForm.querySelector('input[name="name"]').value;
    const intensidade = editarForm.querySelector('input[name="intensidade"]').value;
    const preco = parseInt(editarForm.querySelector('input[name="preco"]').value);

    try {
      const res = await fetch(`${apiBase}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, intensidade, preco })
      });

      const data = await res.json();

      if (res.ok) {
        exibirMensagem("Coffee atualizado com sucesso");
      } else {
        exibirMensagem(data.message || "Erro ao atualizar coffee", false);
      }
    } catch (err) {
      exibirMensagem("Erro ao atualizar coffee", false);
    }
  }

  async function deletarCoffee(e) {
    e.preventDefault();

    const id = deletarForm.querySelector('input[name="id"]').value;

    try {
      const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });

      if (res.status === 204) {
        exibirMensagem("Coffee deletado com sucesso");
        output.textContent = "";
      } else {
        const data = await res.json();
        exibirMensagem(data.message || "Erro ao deletar café", false);
      }
    } catch (err) {
      exibirMensagem("Erro ao deletar café", false);
    }
  }

  window.listarCoffee = async function () {
    try {
      const res = await fetch(apiBase);
      const data = await res.json();

      if (!data || data.length === 0) {
        output.innerHTML = "<p>Nenhum coffee encontrado.</p>";
        return;
      }

      let tabela = `<table class="tabela-coffees">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Intensidade</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>`;

      data.forEach(coffee => {
        tabela += `
          <tr>
            <td>${coffee.id ?? '-'}</td>
            <td>${coffee.name}</td>
            <td>${coffee.intensidade}</td>
            <td>${coffee.preco}</td>
          </tr>`;
      });

      tabela += "</tbody></table>";

      output.innerHTML = `<h3>Lista de Café</h3>${tabela}`;
    } catch (err) {
      exibirMensagem("Erro ao listar cafés", false);
    }
  };

  if (createForm) createForm.addEventListener("submit", cadastrarCoffee);
  if (buscarForm) buscarForm.addEventListener("submit", buscarCoffee);
  if (editarForm) editarForm.addEventListener("submit", editarCoffee);
  if (deletarForm) deletarForm.addEventListener("submit", deletarCoffee);
});