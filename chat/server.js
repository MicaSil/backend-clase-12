const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const PORT = 8081;
const app = express();
app.use(express.static('public'));
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const messages = [
	{ author: 'Guillermo', text: '¡Hola! ¿Qué tal?' },
	{ author: 'Delfina', text: 'Muy bien! ¿Y vos?' },
	{ author: 'Matias', text: 'Genial!' }
]

io.on('connection', socket => {
	console.log('Un usuario ha inisiado sesion');
	io.sockets.emit('messages', messages);
	socket.emit('messages', messages);
	socket.on('new-message', data => {
		messages.push(data);
		io.sockets.emit('messages', messages);
	})
});

httpServer.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});