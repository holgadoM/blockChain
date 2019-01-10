const SHA256 =  require('crypto-js/sha256');

class chain{

    constructor(index,data, prevHash=''){
        this.index = index;
        this.data = data;
        this.date = new Date();
        this.prevHash = prevHash;
        this.hash = this.CrearHash();
        this.nonce = 0;
        this.hayQueMinar = true;

    }

    CrearHash(){
        return SHA256(this.index + this.data + this.date + this.prevHash + this.nonce).toString();
    }

    minado(dificultad){
        console.log("Comenzo el minado...");
        while( !this.hash.startsWith(dificultad) && this.hayQueMinar ){
            this.nonce++;
            this.hash = this.CrearHash();
        }
        console.log("Termine el minado!!!!!!");
        console.log("Con el HASH: ", this.hash);
        return true;
    }

}

class block{
    constructor(genesis, dificultad = "000"){
        this.chain = [this.primerBloque(genesis)];
        this.dificultad = dificultad;
    }

    primerBloque(genesis){
        return new chain(0,genesis);
    }

    ultimoBloque(){
        return this.chain[ this.chain.length-1 ];
    }

    agregarBloque(datos){
        let BloqueAnterior = this.ultimoBloque();
        let nuevo = new chain(BloqueAnterior.index+1,datos,BloqueAnterior.hash);
        nuevo.minado( this.dificultad );
        console.log("Minado completo con ("+nuevo.nonce+") iteraciones");
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

module.exports = chain;