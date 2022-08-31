const socket = io.connect();
socket.on('messages', data => {
	console.log(data);
});

const render = data => {
	const html = data.map((elem, index) => {
		return (
			`<div>
				<strong>${elem.author}</strong>:
				<em>${elem.text}</em>
			</div>`)
	}).join(' ');
	document.querySelector('#messages').innerHTML = html;
};

const addMessage = e => {
	const message = {
		author: document.querySelector('#username').value,
		text: document.querySelector('#text').value
	};
	socket.emit('new-message', message);
	return false;
}

socket.on('messages', data => {
	render(data);
})