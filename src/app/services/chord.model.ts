export class Chord {
    constructor (
        private keyNote: string,
        private keyMood: string,
        private chordNumber: string
    ) {}

    getKeyNote() {
        return this.keyNote;
    }

    getKeyMood() {
        return this.keyMood;
    }

    getChordNumber() {
        return this.chordNumber;
    }
}