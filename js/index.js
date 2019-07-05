const instance = new TypeIt('#js-typeWriter', {
	strings: [
		'HTML5',
		'CSS3 and preprocessor',
		'JavaScript ES6 and beyond',
		'React stack [Router-Redux]',
		'Php',
		'MySql',
		'Content Management System',
		'Bash scripting',
		'Web and Browser API',
		'RESTful services',
		'Ajax',
		'Webpack',
		'Version Control',
		'NPM',
		'Developer tools'
	],
	speed: 50,
	breakLines: false,
	waitUntilVisible: true,
	loop: true
}).go()

//Dynamic copyright
const copyright = new Date().getFullYear()
document.querySelector('#js-copyright').innerText = copyright
