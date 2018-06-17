import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiSwitchModule } from 'ngx-toggle-switch';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChordsInKeyComponent } from './chords-in-key/chords-in-key.component';
import { GenerateProgressionsComponent } from './generate-progressions/generate-progressions.component';
import { ChordFinderService } from './services/chord-finder.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestureConfig } from '@angular/material';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
const appRoutes: Routes = [
  { path: '', redirectTo: 'chords-in-key', pathMatch: 'full'},
  { path: 'chords-in-key', component: ChordsInKeyComponent },
  { path: 'chords-in-key', component: GenerateProgressionsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChordsInKeyComponent,
    GenerateProgressionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    UiSwitchModule,
    MatSliderModule
  ],
  providers: [ChordFinderService, 
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
