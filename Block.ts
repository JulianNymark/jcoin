import { Sha256 } from './sha256';

interface BlockContent {
    serial: number;
    previousHash: string;
    data: string; // ledger goes here
}

export class Block {
    private content: BlockContent;

    constructor(content: BlockContent) {
        this.content = content;
    }

    public getRawHashee(guess: string): string {
        return JSON.stringify(this.content) + guess;
    }

    public hash = (guess: string): string => {
        const toHash = JSON.stringify(this.content) + guess;
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
