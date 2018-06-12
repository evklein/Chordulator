export class Chord {
    public isIonian: boolean = false;
    public isDorian: boolean = false;
    public isPhrygian: boolean = false;
    public isLydian: boolean = false;
    public isMixolydian: boolean = false;
    public isAeolian: boolean = false;
    public isLocrian: boolean = false;

    constructor (
        private keyNote: string,
        private keyMood: string,
        private chordNumber: string,
        private mode: string
    ) {
        switch (mode) {
            case 'Ionian':
              this.isIonian = true;
              break;
            case 'Dorian':
              this.isDorian = true;
              break;
            case 'Phrygian':
              this.isPhrygian = true;
              break;
            case 'Lydian':
              this.isLydian = true;
              break;
            case 'Mixolydian':
              this.isMixolydian = true;
              break;
            case 'Aeolian':
              this.isAeolian = true;
              break;
            case 'Locrian':
              this.isLocrian = true;
              break;
          }
    }

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