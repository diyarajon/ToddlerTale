//all credit for this code goes to YouTuber Adam Thomas. I used his tutorial to achieve the arduino to website connnection: https://codeadam.ca/learning/arduino-to-nodejs.html

var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( 'index.html');

var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('COM3',{ 
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    
    console.log('listening');
    
});

parser.on('data', function(data) {
    
    console.log(data);
    
    io.emit('data', data);
    
});

app.listen(3000);