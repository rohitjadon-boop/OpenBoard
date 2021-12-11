let express = require('express');
let socket = require('socket.io');

let app = express();

app.use(express.static('public'));

const port = 5000;

let server = app.listen(port, () => {
    console.log(`server is started at ${port}`);
});

let io = socket(server);


//Acts As Event Listener When FrontEnd Gets Connected To It
io.on('connection', (socket) => {
    console.log('Made Socket Connection');

    //Acts As Event Listener Which Sees If FrontEnd Emits beginPath Data
    socket.on('beginPath', (data) => {
        io.sockets.emit('beginPath', data);
    });

    //Acts As Event Listener Which Sees If FrontEnd Emits endPath Data
    socket.on('endPath', data => {
        io.sockets.emit('endPath', data);
    });
});
