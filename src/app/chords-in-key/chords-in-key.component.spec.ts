import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsInKeyComponent } from './chords-in-key.component';

describe('ChordsInKeyComponent', () => {
  let component: ChordsInKeyComponent;
  let fixture: ComponentFixture<ChordsInKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordsInKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordsInKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
