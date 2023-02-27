const Block = require('./block');
const fooBlock = Block.mineBlock(Block.genesis(), 'data lukman');
console.log(fooBlock.toString());
