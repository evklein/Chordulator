import { Chord } from "./chord.model";

export class ChordFinderService {
    notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
    modes = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian']
    
    majorIntervals = [2, 2, 1, 2, 2, 2, 1];
    majorChordTypes = ['', 'min', 'min', '', '', 'min', 'dim'];
    majorChordNums = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
    dorianIntervals = [2, 1, 2, 2, 2, 1, 2];
    dorianChordTypes = ['min', 'min', '', '', 'min', 'dim', ''];
    dorianChordNums = ['i', 'ii', 'III', 'IV', 'v', 'vi°', 'VII'];
    phrygianIntervals = [1, 2, 2, 2, 1, 2, 2];
    phrygianChordTypes = ['min', '', '', 'min', 'dim', '', 'min'];
    phrygianChordNums = ['i', 'II', 'III', 'iv', 'v°', 'VI', 'vii'];
    lydianIntervals = [2, 2, 2, 1, 2, 2, 1];
    lydianChordTypes = ['', '', 'min', 'dim', '', 'min', 'min'];
    lydianChordNums = ['I', 'II', 'iii', 'iv°', 'V', 'vi', 'vii'];
    mixolydianIntervals = [2, 2, 1, 2, 2, 1, 2];
    mixolydianChordTypes = ['', 'min', 'dim', '', 'min', 'min', ''];
    mixolydianChordNums = ['I', 'ii', 'iii°', 'IV', 'v', 'vi', 'VII']
    minorIntervals = [2, 1, 2, 2, 1, 2, 2];
    minorChordTypes = ['min', 'dim', '', 'min', 'min', '', ''];
    minorChordNums = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];
    locrianIntervals = [1, 2, 2, 1, 2, 2, 2];
    locrianChordTypes = ['dim', '', 'min', 'min', '', '', 'min'];
    locrianChordNums = ['i°', 'II', 'iii', 'iv', 'V', 'VI', 'vii'];

    modeIntervals = [this.majorIntervals, this.dorianIntervals, this.phrygianIntervals, this.lydianIntervals, this.mixolydianIntervals, this.minorIntervals, this.locrianIntervals];
    modeChordtypes = [this.majorChordTypes, this.dorianChordTypes, this.phrygianChordTypes, this.lydianChordTypes, this.mixolydianChordTypes, this.minorChordTypes, this.locrianChordTypes];
    modeChordNums = [this.majorChordNums, this.dorianChordNums, this.phrygianChordNums, this.lydianChordNums, this.mixolydianChordNums, this.minorChordNums, this.lydianChordNums];

    public getNotes() {
        return this.notes;
    }

    public getChords(note: string, mood: string): Chord[] {
        if (mood === 'major') {
            return this.getMajorChords(note);
        } else if (mood === 'minor') {
            return this.getMinorChords(note);
        }
    }

    public getChordsForMode(note: string, intervals: number[], chordTypes: string[], chordNums: string[]): Chord[] {
        let keyIndex = 0;
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i] == note) {
                keyIndex = i;
            }
        }

        let chords: Chord[] = [new Chord(note, chordTypes[0], chordNums[0])];
        for (let i = 0; i < intervals.length - 1; i++) {
            keyIndex += intervals[i];
            if (keyIndex >= this.notes.length) keyIndex -= this.notes.length
            chords.push(new Chord(this.notes[keyIndex], chordTypes[i + 1], chordNums[i + 1]))
        }

        return chords;
    }

    public getMajorChords(note: string) {
        return this.getChordsForMode(note, this.majorIntervals, this.majorChordTypes, this.majorChordNums);
    }

    public getDorianChords(note: string) {
        return this.getChordsForMode(note, this.dorianIntervals, this.dorianChordTypes, this.dorianChordNums);
    }

    public getPhygianChords(note: string) {
        return this.getChordsForMode(note, this.phrygianIntervals, this.phrygianChordTypes, this.phrygianChordNums);
    }

    public getLydianChords(note: string) {
        return this.getChordsForMode(note, this.lydianIntervals, this.lydianChordTypes, this.lydianChordNums);
    }

    public getMixolydianChords(note: string) {
        return this.getChordsForMode(note, this.mixolydianIntervals, this.mixolydianChordTypes, this.mixolydianChordNums);
    }

    public getMinorChords(note: string) {
        return this.getChordsForMode(note, this.minorIntervals, this.minorChordTypes, this.minorChordNums);
    }

    public getLocrianChords(note: string) {
        return this.getChordsForMode(note, this.locrianIntervals, this.locrianChordTypes, this.locrianChordNums);
    }
}