document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
  
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
  
    const dados = { nome, email, senha };
  
    fetch("/api/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(data => {
      alert("Cadastro realizado com sucesso!");
      console.log(data);
    })
    .catch(err => {
      alert("Erro ao cadastrar!");
      console.error(err);
    });
  });