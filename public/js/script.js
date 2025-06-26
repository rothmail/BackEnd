document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const cadastroForm = document.getElementById("cadastroForm");
  const formulario = document.getElementById("formulario");
  const mensagemSucesso = document.getElementById("mensagemSucesso");
  const voltarBtn = document.getElementById("voltarBtn");

  async function realizarLogin(e) {
    e.preventDefault();

    const email = document.getElementById("email-login")?.value;
    const password = document.getElementById("senha-login")?.value;

    if (!email || !password) {
      alert("Preencha todos os campos do login.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/usersLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        mensagemSucesso.style.display = "block";
        formulario.style.display = "none";
        setTimeout(() => {
          window.location.href = "telaPrincipal.html";
        }, 1500);
      } else {
        const data = await res.json();
        alert(data.message || "Erro ao fazer login");
      }
    } catch (error) {
      alert("Erro na requisição: " + error.message);
    }
  }

  async function realizarCadastro(e) {
    e.preventDefault();

    const name = document.getElementById("nome")?.value;
    const email = document.getElementById("email-cadastro")?.value;
    const password = document.getElementById("senha-cadastro")?.value;
    const confirmar = document.getElementById("confirmar")?.value;

    if (!name || !email || !password || !confirmar) {
      alert("Preencha todos os campos do cadastro.");
      return;
    }

    if (password !== confirmar) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      if (res.ok) {
        mensagemSucesso.style.display = "block";
        formulario.style.display = "none";
        setTimeout(() => {
          window.location.href = "entrar.html";
        }, 1500);
      } else {
        const data = await res.json();
        alert(data.message || "Erro ao cadastrar");
      }
    } catch (error) {
      alert("Erro na requisição: " + error.message);
    }
  }

  if (loginForm) {
    loginForm.addEventListener("submit", realizarLogin);
  }

  if (cadastroForm) {
    cadastroForm.addEventListener("submit", realizarCadastro);
  }

  if (voltarBtn) {
    voltarBtn.addEventListener("click", function () {
      mensagemSucesso.style.display = "none";
      formulario.style.display = "block";
      if (loginForm) loginForm.reset();
      if (cadastroForm) cadastroForm.reset();
    });
  }
});