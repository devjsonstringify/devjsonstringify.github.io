const skillsString = "JavaScript/TypeScript • ReactJS/NextJS • Node/Express.js • HTML5/CSS/Sass • Relational (SQL) and NoSQL databases • Version Control • RESTful services • Agile Methodologies • Python • Power BI • GraphQL • RESTful services • Socket.io, Redis (Real-time messaging for event-driven architecture.) • Firebase cloud messaging • gRPC • microservices • Technical leadership • FastAPI";

const skillsArray = skillsString.split(' • ');

const instance = new TypeIt('#js-typeWriter', {
	strings: skillsArray,
	speed: 50,
	breakLines: false,
	waitUntilVisible: true,
	loop: true
}).go()

//Dynamic copyright
const copyright = new Date().getFullYear()
document.querySelector('#js-copyright').innerText = copyright
