import { Component, OnInit } from '@angular/core';
import { SpeechService } from '../services/speech/speech.service';
import {
  SpellingListService,
  SpellingList,
  SpellingWord
} from '../services/spelling-list/spelling-list.service';

@Component({
  selector: 'app-word-preview',
  templateUrl: 'word-preview.component.html',
  styleUrls: ['word-preview.component.scss']
})
export class WordPreviewComponent implements OnInit {
  list: SpellingList;
  current: SpellingWord;
  masteredWords: SpellingWord[] = [];
  unmasteredWords: SpellingWord[] = [];
  enteredWord: string;

  constructor(
    private speech: SpeechService,
    private spellingList: SpellingListService
  ) {}
  async ngOnInit() {
    await this.speech.init();
    this.spellingList.getList().subscribe(l => {
      this.list = l;
      this.startActivity();
    });
  }

  startActivity() {
    this.unmasteredWords = this.list.words.slice();
    this.masteredWords = [];
    this.nextWord();
  }

  repeatWord() {
    this.speech.say(this.current.word);
  }

  nextWord() {
    if (!this.unmasteredWords.length) {
      throw new Error('no more spelling words');
    }
    this.enteredWord = '';
    this.current = this.unmasteredWords.sort(this.randomOrder)[0];
    this.speech.say(this.current.word);
    this.speech.say(this.current.sentence.replace(/_+/g, this.current.word));
    this.speech.spell(this.current.word);
    this.speech.say(this.current.word);
  }

  onMastered() {
    this.masteredWords.push(this.current);
    this.unmasteredWords = this.unmasteredWords.filter(
      sw => sw.word !== this.current.word
    );
    if (this.unmasteredWords.length) {
      this.nextWord();
    }
  }

  onMissed() {
    this.nextWord();
  }

  randomOrder() {
    return Math.random() > 0.5 ? 1 : -1;
  }

  checkWord() {
    if (
      this.current.word.toLowerCase() === (this.enteredWord || '').toLowerCase()
    ) {
      this.onMastered();
    } else {
      this.onMissed();
    }
  }
}
