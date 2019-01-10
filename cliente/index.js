const http = require('http');
var io = require('socket.io-client');

var ch = require('./Block/block');

var chain

try {
    const socket = io('http://localhost:4002', { forceNew: true });

    socket.on('connect', function (recibido){
        console.log('\x1b[31mconectado al servidor... \x1b[0m');
        PedirBlock();
    });

    socket.on('block', (block)=>{
        var c = block.chain;
        chain = new ch( c.length , c.data , c[c.length-1].prevHash );

        if( chain.minado( block.dificultad ) ){
            socket.emit('minado', chain);
            
        }
    });

    socket.on('DejarDeMinar', ()=>{
        chain.hayQueMinar = false;
        console.log("dejen de minar esclavos!!");
    });

    function PedirBlock(){
        socket.emit('DameUnBlock',{pedir:true,id:socket.id});
    }


    
} catch (error) {
    console.log(error)
}

