const SHA256 = require('crypto-js/sha256');
// const hex2ascii = require('hex2ascii');

const DIFFICULTY = 3;
const MINE_RATE = 3000;


class Block{
    constructor(time, previousHash, hash, data, nonce, difficulty) {
        this.time = time;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
      }

      static get genesis() {
        const time = new Date("2009-03-01").getTime();
        return new this(
          time,
          undefined,
          "genesis_hash",
          "Genesis Block",
          0,
          DIFFICULTY
        );
      }

      static mine(previousBlock, data) {
        const { hash: previousHash } = previousBlock;
        let { difficulty } = previousBlock;
        let hash;
        let time;
        let nonce = 0;
    
        do {
          time = Date.now();
          nonce += 1;
          difficulty =
            previousBlock.time + MINE_RATE > time ? difficulty + 1 : difficulty - 1;
          hash = SHA256(previousHash + time + data + nonce + difficulty).toString();
        } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));
    
        return new this(time, previousHash, hash, data, nonce, difficulty);
      }

    toString(){
        const {time, previousHash, hash, data, nonce, difficulty} = this; 
        return `Block - 
            Time: ${time}
            Previous Block Hash: ${previousHash}
            Hash: ${hash}
            Data: ${data}
            Nonce: ${nonce}
            Difficulty: ${difficulty}
            -----------------------------------------------------------------------`;
    }









    // validate(){
    //     const self = this;
    //     return new Promise((resolve, reject)=>{
    //         let currentHash = self.hash;

    //         self.hash = SHA256(JSON.stringify({ ...self, hash: null})).toString();

    //         if(currentHash != self.hash){
    //             return resolve(false);
    //         }

    //         resolve(true);
    //     });
    // }

    // getBlockData(){
    //     const self = this.hash;

    //     return new Promise((resolve, reject)=>{
    //         let encodedData = self.body;
    //         let decodedData = hex2ascii(encodedData);
    //         let dataObject = JSON.parse(decodedData);

    //         if(dataObject === 'Genesis Block'){
    //             reject(new Error('This is the Genesis Block'))
    //         }
    //         resolve(dataObject);
    //     });
    // }

    // toString(){
    //     const {hash, height, body, time, previousBlockHash} = this; 
    //     return `Block - 
    //         hash: ${hash}
    //         height: ${height}
    //         body: ${body}
    //         time: ${time}
    //         previousBlockHash: ${previousBlockHash}
    //         ---------------------------------------`;
    // }





}


module.exports = Block;