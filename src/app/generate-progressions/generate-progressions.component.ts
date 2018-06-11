import { Component, OnInit, ViewChild } from '@angular/core';
import { ChordFinderService } from '../services/chord-finder.service';
import { NgForm } from '@angular/forms';
import { Chord } from '../models/chord.model';

@Component({
  selector: 'app-generate-progressions',
  templateUrl: './generate-progressions.component.html',
  styleUrls: ['./generate-progressions.component.css']
})
export class GenerateProgressionsComponent implements OnInit {
  majorSelected: boolean = true;
  minorSelected: boolean = false;
  randomKey: boolean = true;
  chords: Chord[] = [];
  progressionGenerated: boolean = false;
  keyNote: string;
  keyMood: string;
  selectedKey: string = 'C';

  ionianChecked: boolean = true;
  dorianChecked: boolean = false;
  phrygianChecked: boolean = false;
  lydianChecked: boolean = false;
  mixolydianChecked: boolean = false;
  aeolianChecked: boolean = false;
  locrianChecked: boolean = false;
  ionianDisabled: boolean = true;
  aeolianDisabled: boolean = false;


  constructor(private chordFinderService: ChordFinderService) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.chords = []; // Reset chords.
    let key = this.getKey();

    let keyChords: Chord[] = this.getAllChords(key);
    // if (this.majorSelected) {
    //   keyChords = this.chordFinderService.getChords(key, 'major');
    //   this.keyMood = 'major';
    // }
    // else if (this.minorSelected) {
    //   keyChords = this.chordFinderService.getChords(key, 'minor');
    //   this.keyMood = 'minor';
    // }
    const MIN_NUM_CHORDS = 2;
    const MAX_NUM_CHORDS = 5;
    let numOfChords = MIN_NUM_CHORDS + Math.floor(Math.random() * MAX_NUM_CHORDS); // 2 - 6 chords, add slider later for users. 

    for (let i = 0; i < numOfChords; i++) {
      let randomChordIndex = Math.floor(Math.random() * keyChords.length);
      this.chords.push(keyChords[randomChordIndex]);
    }
    this.keyNote = key;
    this.progressionGenerated = true;
  }

  private getKey() {
    let key;
    if (this.randomKey) {
      let notes = this.chordFinderService.getNotes();
      return notes[Math.floor(Math.random() * notes.length)];
    } else {
      return this.selectedKey;
    }
  }

  private getAllChords(key: string) {
    let chords: Chord[] = [];

    if (this.ionianChecked) {
      chords.push.apply(chords, this.chordFinderService.getMajorChords(key));
    }
    if (this.dorianChecked) {
      chords.push.apply(chords, this.chordFinderService.getDorianChords(key));
    }
    if (this.phrygianChecked) {
      chords.push.apply(chords, this.chordFinderService.getPhygianChords(key));
    }
    if (this.lydianChecked) {
      chords.push.apply(chords, this.chordFinderService.getLydianChords(key));
    }
    if (this.mixolydianChecked) {
      chords.push.apply(chords, this.chordFinderService.getMixolydianChords(key));
    }
    if (this.aeolianChecked) {
      chords.push.apply(chords, this.chordFinderService.getMinorChords(key));
    }
    if (this.locrianChecked) {
      chords.push.apply(chords, this.chordFinderService.getLocrianChords(key));
    }

    return chords;
  }

  private setKeyMood(mood: string) {
    this.resetSwitches();
    if (mood === 'major') {
      this.minorSelected = false;
      this.majorSelected = true;
      this.aeolianDisabled = false;
      this.ionianChecked = true;
      this.ionianDisabled = true;
    } else if (mood === 'minor') {
      this.minorSelected = true;
      this.majorSelected = false;
      this.ionianDisabled = false;
      this.aeolianChecked = true;
      this.aeolianDisabled = true;
    }
  }
  
  onToggleRandomSwitch(event: boolean) {
    this.randomKey = event;
    console.log(this.randomKey);
  }

  onToggleModeSwitch(mode: string) {
    switch (mode) {
      case 'ionian':
        this.ionianChecked = !this.ionianChecked;
        break;
      case 'dorian':
        this.dorianChecked = !this.dorianChecked;
        break;
      case 'phrygian':
        this.phrygianChecked = !this.phrygianChecked;
        break;
      case 'lydian':
        this.lydianChecked = !this.lydianChecked;
        break;
      case 'mixolydian':
        this.mixolydianChecked = !this.mixolydianChecked;
        break;
      case 'aeolian':
        this.aeolianChecked = !this.aeolianChecked;
        break;
      case 'locrian':
        this.locrianChecked = !this.locrianChecked;
        break;
    }
  }

  resetSwitches() {
    this.ionianChecked = false;
    this.dorianChecked = false;
    this.phrygianChecked = false;
    this.lydianChecked = false;
    this.mixolydianChecked = false;
    this.aeolianChecked = false;
    this.locrianChecked = false;
  }
}
