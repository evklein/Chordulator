import { Chord } from "../models/chord.model";
import { ReturnStatement } from "@angular/compiler";

export class ChordFinderService {
    modes = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];
    modeChordNums = [
        ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
        ['i', 'ii', 'III', 'IV', 'v', 'vi°', 'VII'],
        ['i', 'II', 'III', 'iv', 'v°', 'VI', 'vii'],
        ['I', 'II', 'iii', 'iv°', 'V', 'vi', 'vii'],
        ['I', 'ii', 'iii°', 'IV', 'v', 'vi', 'VII'],
        ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
        ['i°', 'II', 'iii', 'iv', 'V', 'VI', 'vii']
    ];
    modeChordTypes = [
        ['', 'min', 'min', '', '', 'min', 'dim'],
        ['min', 'min', '', '', 'min', 'dim', ''],
        ['min', '', '', 'min', 'dim', '', 'min'],
        ['', '', 'min', 'dim', '', 'min', 'min'],
        ['', 'min', 'dim', '', 'min', 'min', ''],
        ['min', 'dim', '', 'min', 'min', '', ''],
        ['dim', '', 'min', 'min', '', '', 'min']
    ];
    modeChanges = [
        [0, 0, 0, 0, 0, 0, 0],     // Ionian (Major)
        [0, 0, -1, 0, 0, 0, -1],   // Dorian
        [0, -1, -1, 0, 0, -1, -1], // Phrygian
        [0, 0, 0, 1, 0, 0, 0],     // Lydian
        [0, 0, 0, 0, 0, 0, -1],    // Mixolydian
        [0, 0, -1, 0, 0, -1, -1],  // Aeolian (Minor)
        [0, -1, -1, 0, -1, -1, -1] // Locrian
    ];

    baseScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    orderOfSharps = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
    orderOfFlats = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];
    circleOfFifthSharps = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
    circleOfFifthFlats = ['F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭'];

    buildBaseScale(rootNote) {
        let bareRootNote = rootNote.substring(0, 1);
        let newBaseScale = [];
        let index = this.baseScale.indexOf(bareRootNote);

        for (let i = 0; i < this.baseScale.length; i++) {
            if (index >= 7) index = 0;
            newBaseScale.push(this.baseScale[index++]);
        }

        return newBaseScale;
    }

    buildIonianScale(rootNote) {
        let baseScale = this.buildBaseScale(rootNote);
        let ionianScale = [];

        if (rootNote === "C") { // No sharps or flats.
            ionianScale = baseScale;
        } else if (this.circleOfFifthSharps.includes(rootNote)) { // Use sharps
            let numOfSharps = this.circleOfFifthSharps.indexOf(rootNote) + 1;
            let sharps = this.orderOfSharps.slice(0, numOfSharps);

            for (let i = 0; i < baseScale.length; i++) {
                let baseScaleNote = baseScale[i];
                if (sharps.includes(baseScaleNote)) {
                    baseScaleNote += "#";
                }
                ionianScale.push(baseScaleNote);
            }
        } else if (this.circleOfFifthFlats.includes(rootNote)) { // Use flats
            let numOfFlats = this.circleOfFifthFlats.indexOf(rootNote) + 1;
            let flats = this.orderOfFlats.slice(0, numOfFlats);

            for (let i = 0; i < baseScale.length; i++) {
                let baseScaleNote = baseScale[i];
                if (flats.includes(baseScaleNote)) {
                    baseScaleNote += "♭";
                }
                ionianScale.push(baseScaleNote);
            }
        }

        return ionianScale;
    }

    getNotesForMode(rootNote: string, mode: number) {
        let ionianBaseScale = this.buildIonianScale(rootNote);
        let nextMode = [];
        let nextModeChanges = this.modeChanges[mode];

        for (let i = 0; i < 7; i++) {
            let nextModeLetter = ionianBaseScale[i];
            let nextModeChange = nextModeChanges[i];

            if (nextModeChange == 1) {
                if (nextModeLetter.includes("♭"))
                    nextModeLetter = nextModeLetter.substring(0, nextModeLetter.length - 1);
                else
                    nextModeLetter += "#";
                } else if (nextModeChange == -1) {
                    if (nextModeLetter.includes("#"))
                        nextModeLetter = nextModeLetter.substring(0, nextModeLetter.length - 1);
                    else
                        nextModeLetter += "♭";
                }
            nextMode.push(nextModeLetter);
        }

        return nextMode;
    }

    getChordsForMode(rootNote: string, mode: number) {
        let modeNotes = this.getNotesForMode(rootNote, mode);
        let modeChordTypes = this.modeChordTypes[mode];
        let modeChordNums = this.modeChordNums[mode];
        let chords = [];
        for (let i = 0; i < modeNotes.length; i++) {
            chords.push( new Chord(modeNotes[i], modeChordTypes[i], modeChordNums[i], this.modes[mode]));
        }
        return chords;
    }

    public getMajorChords(note: string) {
        return this.getChordsForMode(note, 0);
    }

    public getDorianChords(note: string) {
        return this.getChordsForMode(note, 1);
    }

    public getPhygianChords(note: string) {
        return this.getChordsForMode(note, 2);
    }

    public getLydianChords(note: string) {
        return this.getChordsForMode(note, 3);
    }

    public getMixolydianChords(note: string) {
        return this.getChordsForMode(note, 4);
    }

    public getMinorChords(note: string) {
        return this.getChordsForMode(note, 5);
    }

    public getLocrianChords(note: string) {
        return this.getChordsForMode(note, 6);
    }

    public getNotes() {
        return ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭'];
    }
}