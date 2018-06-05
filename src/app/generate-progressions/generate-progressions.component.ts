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

  constructor(private chordFinderService: ChordFinderService) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.chords = []; // Reset chords.
    let key;
    if (this.randomKey) {
      key = this.getRandomKey();
    } else {
      // set key to whatever selector is on
    }

    let keyChords: Chord[];
    if (this.majorSelected) {
      keyChords = this.chordFinderService.getChords(key, 'major');
      this.keyMood = 'major';
    }
    else if (this.minorSelected) {
      keyChords = this.chordFinderService.getChords(key, 'minor');
      this.keyMood = 'minor';
    }

    let numOfChords = 2 + Math.floor(Math.random() * 5); // 2 - 6 chords, add slider later for users.
    for (let i = 0; i < numOfChords; i++) {
      let randomChordIndex = Math.floor(Math.random() * 7); // 7 poss. chords in each chord.
      this.chords.push(keyChords[randomChordIndex]);
    }
    this.keyNote = key;
    this.progressionGenerated = true;
  }

  private getRandomKey() {
    let notes = this.chordFinderService.getNotes();
    return notes[Math.floor(Math.random() * notes.length)];
  }

  private setKeyMood(mood: string) {
    if (mood === 'major') {
      this.minorSelected = false;
      this.majorSelected = true;
    } else if (mood === 'minor') {
      this.minorSelected = true;
      this.majorSelected = false;
    }
  }

}
