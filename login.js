const h1 = document.querySelector("h1");
const p = document.querySelector("p");

const res = await fetch("http://localhost:3000/auth/profile", {
  credentials: true,
});
const data = await res.json();

h1.innerText = data.name;
p.innerText = data.email;
