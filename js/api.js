const btn = document.querySelector("#btn");
const usuarios = document.querySelector("#usuarios");

btn.addEventListener("click", buscarUsuarios);

async function buscarUsuarios() {
	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/users");

		const data = await response.json();

		usuarios.innerHTML = "";
        data.forEach(usuario => {
        	usuarios.innerHTML += `
        		<div
        		  <h2>${usuario.name}</h2>
        		  <p>${usuario.email}</p>
        		  <p>${usuario.address.city}</p>
        		  <p>${usuario.phone}</p>
        		 </div>
        	`;
        });
	} catch(error) {
		usuarios.innerHTML = "<p>Erro ao carregar usuários.</p>"
	}
}

//enviar usuario

const formUsuario = document.querySelector("#formUsuario");
const resultado = document.querySelector("#resultado");

formUsuario.addEventListener("submit", enviarUsuario);

async function enviarUsuario(event) {
	event.preventDefault();

	const nome = document.querySelector("#nome").value;
	const email = document.querySelector("#email").value;
	const phone = document.querySelector("#phone").value;

	const novoUsuario = {
		name: nome,
		email: email,
		phone: phone
	};

	try {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/users",
			{
			  method: "POST",
			  headers: {
			  	"Content-Type": "application/json"
			  },
			  body: JSON.stringify(novoUsuario)
			}
			);
		const data = await response.json();

		console.log(data);

		resultado.innerHTML = `
			<h2>Usuário enviado!</h2>
			<p><strong>ID:</strong>${data.id}</p>
			<p><strong>Nome:</strong>${data.email}</p>
			<p><strong>Email:</strong>${data.email}</p>
			<p><strong>Telefone:</strong>${data.phone}</p>
		`;
	} catch(error) {
		resultado.innerHTML = `
			<p>Erro ao enviar usuário</p>
		`;
	}
}