// const Block = require('./src/block');
const Blockchain = require("./src/blockchain");

const blockchain = new Blockchain();

for (let i = 0; i < 100; i++) {
  const block = blockchain.addBlock(`Block ${i}`);
  console.log(block.toString());
}


// async function run(){
//     const blockchain = await new Blockchain();

//     const block1 = new Block({data: "block #1"});
//     await blockchain.addBlock(block1);

//     const block2 = new Block({data: "block #2"});
//     await blockchain.addBlock(block2);

//     const block3 = new Block({data: "block #3"});
//     await blockchain.addBlock(block3);

//     blockchain.print();
// }

// run();

