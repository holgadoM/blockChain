const SHA256 =  require('crypto-js/sha512');

class chain{
    constructor(index,data, prevHash=''){
        this.index = index;
        this.data = data;
        this.date = new Date();
        this.hash = this.CrearHash();
        this.prevHash = prevHash;
        this.nonce = 0;

    }

    CrearHash(){
        return SHA256(this.index + this.data + this.date + this.prevHash + this.nonce).toString();
    }

    minado(dificultad){
        while( !this.hash.startsWith(dificultad) ){
            this.nonce++;
            this.hash = this.CrearHash();
        }
    }

}

class block{
    constructor(genesis, dificultad = "0"){
        this.chain = [this.primerBloque(genesis)];
        this.dificultad = dificultad;
    }

    primerBloque(genesis){
        return new chain(0,genesis);
    }

    ultimoBloque(){
        return this.chain[ this.chain.length-1 ];
    }

    agregarBloque(nuevo){
        // let BloqueAnterior = this.ultimoBloque();
        // let nuevo = new chain(BloqueAnterior.index+1,datos,BloqueAnterior.hash);
        // nuevo.minado( this.dificultad );
        // console.log("Minado completo con ("+nuevo.nonce+") iteraciones");
        this.chain.push(nuevo);
        console.log("\x1b[32m Agregado a la cadena \x1b[0m");

    }

    esValido(){
        for(let i=1; i < this.chain.length ; i++){
            let prevBlock = this.chain[ i-1 ];
            let actualBlock = this.chain[i];

            if( prevBlock.hash != actualBlock.prevHash )
                return false;

            if( actualBlock.CrearHash() != actualBlock.hash )
                return false;
        }

        return true;
    }
}

module.exports = block;

// block = new block("hola");

// block.agregarBloque("soy el 2do bloque");

// block.agregarBloque("Soy millonario");

// console.log( JSON.stringify( block,null,2 ) );

// console.log( block.esValido() );

// block.chain[1].data = "datos falsos";

// console.log( block.esValido() );