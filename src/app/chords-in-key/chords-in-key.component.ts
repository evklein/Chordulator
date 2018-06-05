import { Component, OnInit } from '@angular/core';
import { ChordFinderService } from '../services/chord-finder.service';
import { Chord } from '../services/chord.model';

@Component({
  selector: 'app-chords-in-key',
  templateUrl: './chords-in-key.component.html',
  styleUrls: ['./chords-in-key.component.css']
})
export class ChordsInKeyComponent implements OnInit {
  keyNote: string;
  keyMood: string;
  isValid: boolean = false;
  chords: Chord[];
  dorianChords: Chord[];
  phrygianChords: Chord[];
  lydianChords: Chord[];
  mixolydianChords: Chord[];
  minorChords: Chord[];
  locrianChords: Chord[];

  constructor(private chordFinderService: ChordFinderService) { }

  ngOnInit() {}

  setKeyNote(note: string) {
    this.keyNote = note;
    this.getChordsIfValid();
  }

  setKeyMood(mood: string) {
    this.keyMood = mood;
    this.getChordsIfValid();
  }

  getChordsIfValid() {
    if (!this.keyNote || !this.keyMood) {
      this.isValid = false;
      return; // Don't post anything until user has added all the required information.
    } else {
      this.isValid = true;
    }

    this.chords = this.chordFinderService.getChords(this.keyNote, this.keyMood);
    this.dorianChords = this.chordFinderService.getDorianChords(this.keyNote);
    this.phrygianChords = this.chordFinderService.getPhygianChords(this.keyNote);
    this.lydianChords = this.chordFinderService.getLydianChords(this.keyNote);
    this.mixolydianChords = this.chordFinderService.getMixolydianChords(this.keyNote);
    this.minorChords = this.chordFinderService.getMinorChords(this.keyNote);
    this.locrianChords = this.chordFinderService.getLocrianChords(this.keyNote);
  }
}
