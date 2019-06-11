import { Sha256 } from './sha256';

interface BlockContent {
    serial: number;
    previousHash: string;
    data: string; // ledger goes here
    guess: string;
}

export class Block {
    private content: BlockContent;

    constructor(content: BlockContent) {
        this.content = content;
    }

    public getRawHashee(guess: string): string {
        this.content.guess = guess;
        return JSON.stringify(this.content);
    }

    public hash = (guess: string): string => {
        const toHash = this.getRawHashee(guess);
        const hashed = Sha256.hash(toHash);
        return hashed;
    }

    public verify = (difficulty: number, nextSerial: number, guess: string): boolean => {
        if (this.content.serial !== nextSerial) {
            return false;
        }

        const hashed = this.hash(guess);
        if (hashed.startsWith(`0`.repeat(difficulty))) {
            return true;
        }
        return false;
    }
}
