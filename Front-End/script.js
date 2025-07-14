document.getElementById("cadastroForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
  
  const name = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(res => res.json())
  .then(data => {
    alert("Cadastro realizado com sucesso!");
    console.log(data);
    window.location.href = "login.html";
  })
  .catch(err => {
    alert("Erro ao cadastrar!");
    console.error(err);
  });
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
  
  const name = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(res => res.json())
  .then(data => {
    alert("Login realizado com sucesso!");
    console.log(data);
    window.location.href = "home.html";
  })
  .catch(err => {
    alert("Erro ao login!");
    console.error(err);
  });
});