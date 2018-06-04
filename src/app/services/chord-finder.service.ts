import { Chord } from "./chord.model";

export class ChordFinderService {
    notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
   
    public getChords(note: string, mood: string): Chord[] {
        if (mood === 'major') {
            return this.getMajorChords(note);
        } else if (mood === 'minor') {
            return this.getMinorChords(note);
        }
    }

    private getMajorChords(note: string) {
        let majorIntervals = [2, 2, 1, 2, 2, 2, 1];
        let majorChordTypes = ['', 'min', 'min', '', '', 'min', 'dim'];
        let letters = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

        let keyIndex = 0;
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i] == note) {
                keyIndex = i;
            }
        }

        let chords: Chord[] = [new Chord(note, '', 'I')];
        for (let i = 0; i < majorIntervals.length - 1; i++) {
            keyIndex += majorIntervals[i];
            if (keyIndex >= this.notes.length) keyIndex -= this.notes.length
            chords.push(new Chord(this.notes[keyIndex], majorChordTypes[i + 1], letters[i + 1]))
        }

        return chords;
    }

    private getMinorChords(note: string) {
        let minorIntervals = [2, 1, 2, 2, 1, 2, 2];
        let minorChordTypes = ['min', 'dim', '', 'min', 'min', '', ''];
        let letters = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];

        let keyIndex = 0;
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i] == note) {
                keyIndex = i;
            }
        }

        let chords: Chord[] = [new Chord(note, 'min', 'i')];
        for (let i = 0; i < minorIntervals.length - 1; i++) {
            keyIndex += minorIntervals[i];
            if (keyIndex >= this.notes.length) keyIndex -= this.notes.length
            chords.push(new Chord(this.notes[keyIndex], minorChordTypes[i + 1], letters[i + 1]))
        }

        return chords;
    }
}