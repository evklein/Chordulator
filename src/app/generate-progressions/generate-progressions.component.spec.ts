import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateProgressionsComponent } from './generate-progressions.component';

describe('GenerateProgressionsComponent', () => {
  let component: GenerateProgressionsComponent;
  let fixture: ComponentFixture<GenerateProgressionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateProgressionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateProgressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
