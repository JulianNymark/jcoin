import { Block } from './Block';
import { randomString } from './calc';

const version = `0.0.0`;

(async () => {
    console.log(`jcoin miner ${version}`);

    const difficulty = 2;
    let currentBlockSerial = 0;
    let guess: string = ``;
    const blockChain: Block[] = [];
    let lastBlockHash: string = `genesis block!`;

    while (currentBlockSerial < 3) {
        const block = new Block({ serial: currentBlockSerial, previousHash: lastBlockHash, data: `big money` });

        guess = randomString(64);
        while (!block.verify(difficulty, currentBlockSerial, guess)) {
            guess = randomString(64);
        }

        lastBlockHash = block.hash(guess);
        blockChain.push(block);
        currentBlockSerial++;
        console.log(`#### found hash!!! #### ${lastBlockHash}`);
        console.log(`hash input ####\n${block.getRawHashee(guess)}`);
    }

    console.log(blockChain);
})();
