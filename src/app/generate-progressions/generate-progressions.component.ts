import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-generate-progressions',
  templateUrl: './generate-progressions.component.html',
  styleUrls: ['./generate-progressions.component.css']
})
export class GenerateProgressionsComponent implements OnInit {
  notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
  constructor() { }

  ngOnInit() {
  }

}
