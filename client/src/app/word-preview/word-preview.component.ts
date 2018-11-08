import { Component, OnInit } from '@angular/core';
import { SpeechService } from '../services/speech/speech.service';

@Component({
  selector: 'app-word-preview',
  templateUrl: 'word-preview.component.html',
  styleUrls: ['word-preview.component.scss']
})
export class WordPreviewComponent implements OnInit {
  constructor(private speech: SpeechService) {}
  ngOnInit() {
    console.log('word preview');
    this.speech.say('word preview');
  }
}
