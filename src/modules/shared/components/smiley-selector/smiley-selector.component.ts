import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-smiley-selector',
  templateUrl: './smiley-selector.component.html',
  styleUrls: ['./smiley-selector.component.scss']
})
export class SmileySelectorComponent {

  constructor(
    private modalRef: MatDialogRef<SmileySelectorComponent>,
    ) {
  }

  readonly smileys = [
    // Positive
    String.fromCodePoint(0x1F600),
    String.fromCodePoint(0x1F601),
    String.fromCodePoint(0x1F602),
    String.fromCodePoint(0x1F603),
    String.fromCodePoint(0x1F604),
    String.fromCodePoint(0x1F605),
    String.fromCodePoint(0x1F606),
    String.fromCodePoint(0x1F609),
    String.fromCodePoint(0x1F60A),
    String.fromCodePoint(0x1F60B),
    String.fromCodePoint(0x1F60E),
    // Neutral
    String.fromCodePoint(0x1F610),
    String.fromCodePoint(0x1F611),
    String.fromCodePoint(0x1F636),
    String.fromCodePoint(0x1F60F),
    String.fromCodePoint(0x1F623),
    String.fromCodePoint(0x1F625),
    String.fromCodePoint(0x1F62E),
    String.fromCodePoint(0x1F62F),
    String.fromCodePoint(0x1F62A),
    String.fromCodePoint(0x1F62B),
    String.fromCodePoint(0x1F634),
    String.fromCodePoint(0x1F60C),
    String.fromCodePoint(0x1F61B),
    String.fromCodePoint(0x1F61C),
    String.fromCodePoint(0x1F61D),
    String.fromCodePoint(0x1F612),
    String.fromCodePoint(0x1F613),
    String.fromCodePoint(0x1F614),
    String.fromCodePoint(0x1F615),
    String.fromCodePoint(0x1F632),
    //  Negative
    String.fromCodePoint(0x2639),
    String.fromCodePoint(0x1f641),
    String.fromCodePoint(0x1f616),
    String.fromCodePoint(0x1f61E),
    String.fromCodePoint(0x1f61F),
    String.fromCodePoint(0x1f624),
    String.fromCodePoint(0x1f622),
    String.fromCodePoint(0x1f62D),
    String.fromCodePoint(0x1F626),
    String.fromCodePoint(0x1F627),
    String.fromCodePoint(0x1F628),
    String.fromCodePoint(0x1F629),
    String.fromCodePoint(0x1F62C),
    String.fromCodePoint(0x1F630),
    String.fromCodePoint(0x1F631),
    String.fromCodePoint(0x1F633),
    String.fromCodePoint(0x1F635),
    String.fromCodePoint(0x1F621),
    String.fromCodePoint(0x1F620)
  ];


  select(smiley: string) {
    this.modalRef.close(smiley);
  }

}
