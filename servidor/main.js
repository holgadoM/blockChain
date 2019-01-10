var app = require('express')();
var http = require('http').Server(app);
// var http = require('http').createServer().listen(4002);
var io = require('socket.io')(http);

var block = require('./blockChain/block');

var nBlock = new block("hola");


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html', a =>{
    });
});


io.on('connection', function(socket){
  console.log('Usuario conectado, id: ', socket.id);

  socket.on('disconnect', disc =>{
    console.log("Desconectado!: ", disc);
  });

  socket.on('DameUnBlock',dato=>{
    console.log('\n' + dato.id + ' Pedir block?: \x1b[32m%s\x1b[0m',dato.pedir);
    EnviarBloque(socket);
  });

  socket.on('minado', dato=>{
    console.log("Chain obtenido");
    console.log(dato);
    socket.emit('DejarDeMinar');
    nBlock.agregarBloque(dato);

    if(seguir(socket)){
      console.log("enviando...");
      
    }
  });

  
});

 function seguir(socket){
  console.log("Enviar los bloques: ");
  var stdin = process.stdin;
 stdin.setEncoding('UTF8');
 
  process.stdin.on('data', key=>{
    if(key.toString().trim() === 'y'){
      EnviarBloque(socket);
      return true;
    }else{
      
      return false;
    }
  });



}

function EnviarBloque(socket){ 
  console.log("Enviando block...");   
  socket.emit('block',nBlock);
}

http.listen(4002, ()=>{
  console.log('Estado del servidor (4002): ', 'online');
});
