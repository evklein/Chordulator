import { Component, OnInit } from '@angular/core';
import { ChordFinderService } from '../services/chord-finder.service';
import { Chord } from '../models/chord.model';

@Component({
  selector: 'app-chords-in-key',
  templateUrl: './chords-in-key.component.html',
  styleUrls: ['./chords-in-key.component.css']
})
export class ChordsInKeyComponent implements OnInit {
  keyNote: string;
  keyMood: string = 'major';
  isNormalValid: boolean = false;

  majorSelected: boolean = true;
  minorSelected: boolean = false;
  allModesSelected: boolean = false;
  selectedMoodChords: Chord[];
  ionianChords: Chord[];
  dorianChords: Chord[];
  phrygianChords: Chord[];
  lydianChords: Chord[];
  mixolydianChords: Chord[];
  aeolianChords: Chord[];
  locrianChords: Chord[];

  constructor(private chordFinderService: ChordFinderService) { }

  ngOnInit() {}

  setKeyNote(note: string) {
    this.keyNote = note;
    this.getChordsIfValid();
  }

  setMode(mode: string) {
    this.resetChords();
    if (mode === 'ionian') {
      console.log()
      this.keyMood = 'major';
      this.majorSelected = true;
      this.minorSelected = false;
      this.allModesSelected = false;
    } else if (mode === 'aeolian') {
      this.keyMood = 'minor';
      this.minorSelected = true;
      this.majorSelected = false;
      this.allModesSelected = false;
    } else if (mode === 'all') {
      this.keyMood = '';
      this.majorSelected = false;
      this.minorSelected = false;
      this.allModesSelected = true;
    }
    
    this.getChordsIfValid();
  }

  getChordsIfValid() {
    if (!this.keyNote) {
      this.isNormalValid = false;
      return; // Don't post anything until user has added all the required information.
    } else if (this.allModesSelected && this.keyNote) {
      this.setModalChords();
    } else if (this.keyNote && this.keyMood && !this.allModesSelected) {
      this.isNormalValid = true;
      this.resetChords();

      if (this.majorSelected) {
        this.ionianChords = this.chordFinderService.getMajorChords(this.keyNote);
        this.selectedMoodChords = this.ionianChords;
      } else if (this.minorSelected) {
        this.aeolianChords = this.chordFinderService.getMinorChords(this.keyNote);
        this.selectedMoodChords = this.aeolianChords;
      } else {
        this.setModalChords();
      }
    }
  }

  setModalChords() {
    this.resetChords();
    this.ionianChords = this.chordFinderService.getMajorChords(this.keyNote);
    this.dorianChords = this.chordFinderService.getDorianChords(this.keyNote);
    this.phrygianChords = this.chordFinderService.getPhygianChords(this.keyNote);
    this.lydianChords = this.chordFinderService.getLydianChords(this.keyNote);
    this.mixolydianChords = this.chordFinderService.getMixolydianChords(this.keyNote);
    this.aeolianChords = this.chordFinderService.getMinorChords(this.keyNote);
    this.locrianChords = this.chordFinderService.getLocrianChords(this.keyNote);
  }

  resetChords() {
    this.ionianChords = [];
    this.dorianChords = [];
    this.phrygianChords = [];
    this.lydianChords = [];
    this.mixolydianChords = [];
    this.aeolianChords = [];
    this.locrianChords = [];
  }
}
