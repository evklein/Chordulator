import { Component, OnInit, ViewChild } from '@angular/core';
import { ChordFinderService } from '../services/chord-finder.service';
import { NgForm } from '@angular/forms';
import { Chord } from '../models/chord.model';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-generate-progressions',
  templateUrl: './generate-progressions.component.html',
  styleUrls: ['./generate-progressions.component.css']
})
export class GenerateProgressionsComponent implements OnInit {
  majorSelected: boolean = true;
  minorSelected: boolean = false;
  randomKey: boolean = true;
  useRoot: boolean = true;
  includeDiminishedChords: boolean = true;
  chords: Chord[] = [];
  progressionGenerated: boolean = false;
  keyNote: string;
  keyMood: string = 'major';
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
    const MIN_NUM_CHORDS = 2;
    const MAX_NUM_CHORDS = 5;
    let numOfChords = MIN_NUM_CHORDS + Math.floor(Math.random() * MAX_NUM_CHORDS); // 2 - 6 chords, add slider later for users. 
    let rootChordIndex = Math.floor(Math.random() * numOfChords);

    for (let i = 0; i < numOfChords; i++) {
      if (i == rootChordIndex && this.useRoot) {
        this.chords.push(keyChords[0]);
        continue;
      }
      
      let randomChordIndex = Math.floor(Math.random() * keyChords.length);
      let chordToPush = keyChords[randomChordIndex];
      while (chordToPush.getKeyMood() === 'dim' && !this.includeDiminishedChords) {
        randomChordIndex = Math.floor(Math.random() * keyChords.length);
        chordToPush = keyChords[randomChordIndex];
      }

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

    return this.handleDuplicateChords(chords);
  }

  private handleDuplicateChords(chords: Chord[]) {
    for (let i = 0; i < chords.length; i++) {
      for (let j = 0; j < chords.length; j++) {
        if (i === j) continue;

        if (chords[i].getChordName() === chords[j].getChordName()) {
          if (chords[j].isIonian) chords[i].isIonian = true;
          if (chords[j].isDorian) chords[i].isDorian = true;
          if (chords[j].isPhrygian) chords[i].isPhrygian = true;
          if (chords[j].isLydian) chords[i].isLydian = true;
          if (chords[j].isMixolydian) chords[i].isMixolydian = true;
          if (chords[j].isAeolian) chords[i].isAeolian = true;
          if (chords[j].isLocrian) chords[i].isLocrian = true;
          chords.splice(j, 1);
        }
      }
    }
    return chords;
  }

  private setKeyMood(mood: string) {
    this.keyMood = mood;
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

  onToggleUseRoot(value: boolean) {
    this.useRoot = value;
  }

  onToggleUseDiminishedChords(value: boolean) {
    this.includeDiminishedChords = value;
  }
}