export class Chord {
    constructor (
        private keyNote: string,
        private keyMood: string,
        private chordNumber: string,
        private mode: string
    ) {}

    getChordName() {
        return this.keyNote + this.keyMood;
    }

    getKeyNote() {
        return this.keyNote;
    }

    getKeyMood() {
        return this.keyMood;
    }

    getChordNumber() {
        return this.chordNumber;
    }

    getMode() {
        return this.mode;
    }

    addToChordNumber(newNum: string) {
        this.chordNumber += '/' + newNum;
    }
}